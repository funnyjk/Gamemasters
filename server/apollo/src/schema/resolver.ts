import {
  prisma,
  PlayerWhereUniqueInput,
  Prisma,
  Score,
  Session,
  Tournament,
  TournamentPlayer,
  ScoreWhereInput,
  PlayerWhereInput,
  GameWhereUniqueInput,
  TournamentWhereUniqueInput,
  SessionWhereInput,
  SessionWhereUniqueInput,
  ScoreWhereUniqueInput,
  TournamentPlayerWhereInput,
  GameSubscriptionWhereInput
} from "../../../database/generated/prisma";
import {mutations} from "./mutations";
import {queries} from "./queries";
import { Player } from "./queries/players";

export const resolvers = {
    Query: {
      ...queries,
      tournamentPlayers: (_: any, {where}: {where: TournamentPlayerWhereInput})=> prisma.tournamentPlayers({where}),
      tournamentPlayer: (_: any, {where}: { where: TournamentWhereUniqueInput }) => prisma.tournamentPlayer(where),
      sessions: (_:any, {where}: {where: SessionWhereInput}) => prisma.sessions({where}),
      session: (_: any, {where}: { where: SessionWhereUniqueInput }) => prisma.session(where),
      scores: (_:any, {where}: {where: ScoreWhereInput}) => {
        return prisma.scores({where})
      },
      score: (_: any, {where}: { where: ScoreWhereUniqueInput }) => prisma.score(where),
      // games: () => prisma.games(),
      // game: (_:any, {where}: {where: GameWhereUniqueInput}) => prisma.game(where),
    },
    Mutation: {...mutations},
    Subscription: {
      game: async (_: any, {where}: {where:GameSubscriptionWhereInput}) => await prisma.$subscribe.game(where)
    },
    ...Player,
    // Player: {
    //   tournaments: (parent: any, args: any) => prisma.player({id: parent.id}).tournaments(args),
    //   // scores: (parent: Player, args: any) => prisma.player({id: parent.id}).scores(args),
    // },
    Session: {
      tournament: ({id}: Session, args: any) => prisma.session({id}).tournament(),
      game: ({id}: Session, args: any) => prisma.session({id}).game(),
      scores: ({id}: Session, args: any) => prisma.session({id}).scores(args)
    },
    TournamentPlayer: {
      tournament: ({id}: TournamentPlayer, args: any) => prisma.tournamentPlayer({id}).tournament(),
      player: ({id}: TournamentPlayer, args: any) => prisma.tournamentPlayer({id}).player(),
      scores: ({id}: TournamentPlayer, args: any) => prisma.tournamentPlayer({id}).scores()
    },
    Tournament: {
      players: ({id}: Tournament, args: any) => prisma.tournament({id}).players(args),
      sessions: ({id}: Tournament, args: any) => prisma.tournament({id}).sessions(args)
    },
    Score: {
      session: ({id}: Score, args: any) => prisma.score({id}).session(),
      player: ({id}: Score, args: any) => prisma.score({id}).player()
    }
};

const fragment = `
fragment PlayerWithTourny on Player {
  id
  name
  tournaments {
    id
    tournament {
        name
    }
  }
}`
