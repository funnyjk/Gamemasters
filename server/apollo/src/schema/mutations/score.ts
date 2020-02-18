import {
  prisma,
  ScoreCreateInput, ScoreUpdateInput, ScoreWhereUniqueInput
} from "../../../../database/generated/prisma";

const mutations = {
  createScore(_: any, {data}: { data: ScoreCreateInput }) {
    return prisma.createScore(data);
  },

  deleteScore(_: any, {where}: { where: ScoreWhereUniqueInput }) {
    return prisma.deleteScore(where)
  },

  updateScore(_: any, {data, where}: {
    data: ScoreUpdateInput;
    where: ScoreWhereUniqueInput;
  }) {
    return prisma.updateScore({data, where});
  }
};
export default mutations;