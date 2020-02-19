import {
  prisma,
  GameCreateInput, GameUpdateInput, GameWhereUniqueInput, GameWhereInput
} from "../../../../database/generated/prisma";

const CREATED_GAME = 'CREATED_GAME';

const mutations = {
  createGame: async (_: any, {data}: {data: GameCreateInput}, {user, prisma}: any) => {
    if(!user) throw new Error("Not Logged in");
    const newData: GameUpdateInput = {
      ...data,
      owner: {
        connect: {
          id: user.id
        }
      }
    }
    return prisma.createGame(newData);
  },

  deleteGame(_: any, {where}: {where: GameWhereUniqueInput}) {
    return prisma.deleteGame(where)
  },

  updateGame(_: any, {data, where}: {
    data: GameUpdateInput;
    where: GameWhereUniqueInput;
  }) {
    return prisma.updateGame({data, where});
  }
};
export default mutations;