import {PlayerCreateInput, PlayerUpdateInput, PlayerWhereUniqueInput} from "../../../../database/generated/prisma";

const mutations  = {
  createPlayer(_: any, {data}: {data:PlayerCreateInput}, {user, prisma}: any) {
    if (!user) throw new Error('Not Authenticated');
    const newData: PlayerCreateInput = {
      ...data,
      owner: {
        connect: {
          id: user.id
        }
      }
    };
    return prisma.createPlayer(newData)
  },

  deletePlayer: async (_: any, {where}: {where: PlayerWhereUniqueInput;}, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    const {id} = where;
    const isOwner = await prisma.$exists.player({
      id,
      owner: {
        id: user.id
      }
    });
    if (isOwner) {
      return prisma.deletePlayer(where)
    } else throw new Error('Not Owner');
  },

  updatePlayer: async (_: any, {data, where}: {data: PlayerUpdateInput; where: PlayerWhereUniqueInput;}, {user, prisma}: any) => {
    if (!user) throw new Error('Not Authenticated');
    const {id} = where;
    const isOwner = await prisma.$exists.player({
      id,
      owner: {
        id: user.id
      }
    });
    if (isOwner) {
      return prisma.updatePlayer({data, where});
    } else throw new Error('Not Owner');
  }
};
export default mutations;