import {PlayerCreateInput, PlayerUpdateInput, PlayerWhereUniqueInput, prisma} from "../../../database/generated/prisma";

const mutations  = {
  createPlayer(_: any, {data}: {data: PlayerCreateInput}) {
    return prisma.createPlayer(data)
  },

  deletePlayer(_: any, {where}: {where: PlayerWhereUniqueInput;}) {
    return prisma.deletePlayer(where)
  },

  updatePlayer(_: any, {data, where}: {data: PlayerUpdateInput; where: PlayerWhereUniqueInput;}) {
    return prisma.updatePlayer({data, where});
  }
};
export default mutations;