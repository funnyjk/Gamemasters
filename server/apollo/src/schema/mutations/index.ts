import player from './player';
import tournament from './tournament';
import tournamentPlayer from './tournamentPlayer';
import game from './game';
import session from './session';
import score from './score';
import authentication from './authentication';

export const mutations = {
  ...player,
  ...tournament,
  ...tournamentPlayer,
  ...game,
  ...session,
  ...score,
  ...authentication
};