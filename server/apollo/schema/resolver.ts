import {
  prisma,
  Player,
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
  SessionWhereInput, SessionWhereUniqueInput, ScoreWhereUniqueInput, TournamentPlayerWhereInput
} from "../../database/generated/prisma";
import {mutations} from "./mutations";
import {Simulate} from "react-dom/test-utils";
import wheel = Simulate.wheel;

interface IWhere {
  where: PlayerWhereUniqueInput
}
export const resolvers = {
    Query: {
      players: (_:any, {where}: {where: PlayerWhereInput}) => prisma.players({where}),
      player: (parent: any, {where}: IWhere) => {
        const {id} = where;
        return prisma.player({id})
      },
      tournamentPlayers: (_: any, {where}: {where: TournamentPlayerWhereInput})=> prisma.tournamentPlayers({where}),
      tournamentPlayer: (_: any, {where}: { where: TournamentWhereUniqueInput }) => prisma.tournamentPlayer(where),
      tournaments: () => prisma.tournaments(),
      tournament: (_: any, {where}: { where: TournamentWhereUniqueInput }) => prisma.tournament(where),
      sessions: (_:any, {where}: {where: SessionWhereInput}) => prisma.sessions({where}),
      session: (_: any, {where}: { where: SessionWhereUniqueInput }) => prisma.session(where),
      scores: (_:any, {where}: {where: ScoreWhereInput}) => {
        console.log(where);
        return prisma.scores({where})
      },
      score: (_: any, {where}: { where: ScoreWhereUniqueInput }) => prisma.score(where),
      games: () => prisma.games(),
      game: (_:any, {where}: {where: GameWhereUniqueInput}) => prisma.game(where)
    },
    Mutation: {...mutations},
    Player: {
      tournaments: (parent: Player, args: any) => prisma.player({id: parent.id}).tournaments(args),
      // scores: (parent: Player, args: any) => prisma.player({id: parent.id}).scores(args),
    },
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
