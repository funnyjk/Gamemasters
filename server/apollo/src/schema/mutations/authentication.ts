import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUserFields {
  username: string;
  password: string;
}

const mutations = {
  register: async (parent: any, {username, password}: IUserFields, ctx: any, info: any) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await ctx.prisma.createUser({
      username,
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
  }
};
export default mutations;