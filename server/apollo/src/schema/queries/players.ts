import {PlayerWhereInput, PlayerWhereUniqueInput, prisma} from "../../../../database/generated/prisma";

const queries = {
  players: (_: any, {where}: { where: PlayerWhereInput }, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    return prisma.players({
      where: {
        ...where,
        owner: {id: user.id}
      }
    })
  },
  player: async (parent: any, {where}: { where: PlayerWhereUniqueInput }, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    const {id} = where;
    const isOwner = await prisma.$exists.player({
      id,
      owner: {
        id: user.id
      }
    });
    if (isOwner) {
      return prisma.player({id});
    } else throw new Error('Not OWNER');
  },
};

export const Player = {
  Player: {
    tournaments: (parent: any, args: any) => prisma.player({id: parent.id}).tournaments(args),
  // scores: (parent: Player, args: any) => prisma.player({id: parent.id}).scores(args),
  }
}

export default queries;