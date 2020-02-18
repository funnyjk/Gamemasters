import {
  prisma,
  TournamentCreateInput, TournamentUpdateInput, TournamentWhereUniqueInput
} from "../../../../database/generated/prisma";

const mutations = {
  createTournament(_: any, {data}: {data: TournamentCreateInput;}, {user, prisma}: any) {
    return prisma.createTournament({
      ...data,
      owner: {connect: {id: user.id}}
    })
  },

  deleteTournament(_: any, {where}: {where: TournamentWhereUniqueInput;}) {
    return prisma.deleteTournament(where)
  },

  updateTournament(_: any, {data, where}: { data: TournamentUpdateInput; where: TournamentWhereUniqueInput; }) {
    return prisma.updateTournament({data, where});
  }
};
export default mutations;