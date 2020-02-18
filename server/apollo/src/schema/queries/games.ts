import {GameWhereInput, GameWhereUniqueInput, PlayerWhereInput} from "../../../../database/generated/prisma";

const queries = {
  games: (_: any, {where}: { where: GameWhereInput }, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    return prisma.games({
      where: {
        ...where,
        owner: {id: user.id}
      }
    })
  },
  game: async (parent: any, {where}: { where: GameWhereUniqueInput }, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    const {id} = where;
    const isOwner = await prisma.$exists.game({
      id,
      owner: {
        id: user.id
      }
    });
    if (isOwner) {
      return prisma.game({id});
    } else throw new Error('Not OWNER');
  },
};

export default queries;