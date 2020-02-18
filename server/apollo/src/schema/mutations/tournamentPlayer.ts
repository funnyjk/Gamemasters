import {
  prisma,
  TournamentPlayerCreateInput, TournamentPlayerUpdateInput, TournamentPlayerWhereUniqueInput
} from "../../../../database/generated/prisma";

const mutations = {
  createTournamentPlayer(_: any, {data}: { data: TournamentPlayerCreateInput; }) {
    return prisma.createTournamentPlayer(data)
  },

  deleteTournamentPlayer(_: any, {where}: { where: TournamentPlayerWhereUniqueInput; }) {
    return prisma.deleteTournamentPlayer(where)
  },

  updateTournamentPlayer(_: any, {data, where}: { data: TournamentPlayerUpdateInput; where: TournamentPlayerWhereUniqueInput; }) {
    return prisma.updateTournamentPlayer({data, where});
  }
};
export default mutations;