import bcrypt, {hash} from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import {User, prisma as Prisma} from "../../../../database/generated/prisma";
import {forgotPassword} from "../../forgotPassword";
import moment from "moment";
import {ApolloContext} from "../../../index";
import {forgotPasswordSend} from "../../../../email/sendMail";
import {config} from "../../../../../src/config";

export interface IUserFields {
  password: string;
  email: string;
}
export interface IResetPassword {
  token: string;
  id: string;
  newPassword: string;
}

const mutations = {
  // TODO: Email first registration
  // registerEmail: async (parent: any, {email}: {email: string}, {prisma}: ApolloContext) => {
  //   const vague = `Sent link to ${email} with registration steps`;
  //   const emailExist = prisma.$exists.user({email: email});
  //   if(emailExist) return vague;
  //   prisma.createUser({
  //     email
  //   })
  // },
  register: async (parent: any, {password, email}: IUserFields, ctx: ApolloContext, info: any) => {
    const passwordRules = (password.length > 4);
    if(!passwordRules) throw new Error("Password needs to be at least 5 characters");
    const emailExists = await ctx.prisma.$exists.user({email});
    if(emailExists) throw new Error("Email already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    return ctx.prisma.createUser({
      email,
      password: hashedPassword,
    });
  },
  changePassword: async (parent: any, {oldPassword, newPassword}: {oldPassword: string, newPassword: string}, {user, prisma}: ApolloContext, info: any ) => {
    if (!user) throw new Error('Not Authorized');
    const checkUser = await prisma.user({id: user.id});
    const passwordMatch = await bcrypt.compare(oldPassword, checkUser.password);
    if(!passwordMatch) throw new Error("Incorrect Password");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const newUser = await prisma.updateUser({where: {id: user.id}, data: {
        password: hashedPassword
      }});
    return 'updated password';
  },
  login: async (parent: any, {email, password}: IUserFields, ctx: ApolloContext, info: any) => {
    const user = await ctx.prisma.user({email});

    if (!user) {
      throw new Error('Invalid Login')
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid Login')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      'test-secret',
      {
        expiresIn: '30d', // token will expire in 30days
      },
    )
    return {
      token,
      user,
    }
  },

  deleteProfile: async (parent: any, args: any, {user, prisma}: ApolloContext, info: any) => {
    if(!user) throw new Error('Not Authorized')
    return prisma.deleteUser({id: user.id});
  },
  resetPassword: async (parent: any, {token, id, newPassword}: IResetPassword, {prisma}: ApolloContext) => {
    const resetfailed = "Invalid or expired reset token.";
    const resetPassword = await prisma.user({id}).resetPassword();
    if(!resetPassword) throw new Error(resetfailed);

    let expireTime = moment.utc(resetPassword.exp).toDate();
    let currentTime = new Date();
    if(currentTime.getTime() >= expireTime.getTime()) {
      await prisma.deleteResetPassword({id: resetPassword.id});
      throw new Error(resetfailed);
    }

    const tokenCompare = await bcrypt.compare(token, resetPassword.token);
    if (!tokenCompare) throw new Error(resetfailed);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.updateUser({
      where: {id},
      data: {
        password: hashedPassword
      }
    });
    await prisma.deleteResetPassword({id: resetPassword.id});

    return "Changed password";
  },
  forgotPassword: async (parent: any, {email}: { email: string }, {prisma}: ApolloContext) => {
    const vague = `If a matching account was found an email was sent to allow you to reset your password.`;
    const user = await prisma.user({email});
    if (!user) return vague;
    const resetExists = await prisma.$exists.resetPassword({user});
    if(resetExists) return vague;
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    await prisma.createResetPassword({
      user: {connect: {id: user.id}},
      token: hashedToken,
      exp: moment.utc().add(900, 'seconds').toISOString()
    });

    await forgotPasswordSend({
      id: user.id,
      token,
      url: config().url,
      to: email
    });
    return vague;
  }
};
export default mutations;