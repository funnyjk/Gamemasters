import {
  prisma,
  SessionCreateInput, SessionUpdateInput, SessionWhereUniqueInput
} from "../../../../database/generated/prisma";

const mutations = {
  createSession(_: any, {data}: { data: SessionCreateInput }) {
    return prisma.createSession(data);
  },

  deleteSession(_: any, {where}: { where: SessionWhereUniqueInput }) {
    return prisma.deleteSession(where)
  },

  updateSession(_: any, {data, where}: {
    data: SessionUpdateInput;
    where: SessionWhereUniqueInput;
  }) {
    return prisma.updateSession({data, where});
  }
};
export default mutations;