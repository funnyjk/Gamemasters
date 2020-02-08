import player from './player';
import tournament from './tournament';
import tournamentPlayer from './tournamentPlayer';
import game from './game';
import session from './session';
import score from './score';

export const mutations = {
  ...player,
  ...tournament,
  ...tournamentPlayer,
  ...game,
  ...session,
  ...score
};