import {ApolloContext} from "../../../index";

const queries = {
  currentUser: (parent: any, args: any, {user, prisma}: ApolloContext) => {
    // this if statement is our authentication check
    if (!user) {
      throw new Error('Not Authenticated')
    }
    return prisma.user({id: user.id})
  }
};

export default queries;