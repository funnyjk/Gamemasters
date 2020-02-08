import {
  prisma,
  GameCreateInput, GameUpdateInput, GameWhereUniqueInput
} from "../../../database/generated/prisma";

const mutations = {
  createGame(_: any, {data}: {data: GameCreateInput}) {
    return prisma.createGame(data);
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