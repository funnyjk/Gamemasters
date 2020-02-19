import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User, prisma as Prisma} from "../../../../database/generated/prisma";

export interface IUserFields {
  username: string;
  password: string;
  email: string;
}

const mutations = {
  register: async (parent: any, {username, password, email}: IUserFields, ctx: any, info: any) => {
    const passwordRules = (password.length > 4);
    if(!passwordRules) throw new Error("Password needs to be at least 5 characters");
    const userExist = await ctx.prisma.$exists.user({username});
    if (userExist) throw new Error("Username already exists");
    const emailExists = await ctx.prisma.$exists.user({email});
    if(emailExists) throw new Error("Email already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await ctx.prisma.createUser({
      username,
      email,
      password: hashedPassword,
    })
    return user
  },
  login: async (parent: any, {username, password}: IUserFields, ctx: any, info: any) => {
    const user = await ctx.prisma.user({username})

    if (!user) {
      throw new Error('Invalid Login')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Invalid Login')
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.email,
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

  deleteProfile: async (parent: any, args: any, {user, prisma}: {user: User, prisma: typeof Prisma}, info: any) => {
    if(!user) throw new Error('Not Authorized')
    return prisma.deleteUser({id: user.id});
  }
};
export default mutations;