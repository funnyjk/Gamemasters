import {
  prisma
} from "../../../../database/generated/prisma";

const queries = {
  currentUser: (parent: any, args: any, {user, prisma}: {user: any, prisma: any}) => {
    // this if statement is our authentication check
    if (!user) {
      throw new Error('Not Authenticated')
    }
    return prisma.user({id: user.id})
  },
};

export default queries;