import {TournamentWhereInput, TournamentWhereUniqueInput} from "../../../../database/generated/prisma";

const queries = {
  tournaments: (_: any, {where}: {where: TournamentWhereInput}, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    return prisma.tournaments({where: {
      ...where,
      owner: {id: user.id}
    }})
  },
  tournament: async (_: any, {where}: { where: TournamentWhereUniqueInput }, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    const isOwner = await prisma.$exists.tournament({
      id: where.id,
      owner: {
        id: user.id
      }
    });
    if(isOwner) return prisma.tournament(where);
    else throw new Error('Not Owner');
  },
};

export default queries;