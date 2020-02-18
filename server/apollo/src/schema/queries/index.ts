import authentication from './authentication';
import tournaments from './tournaments';
import players from './players';
import games from './games';

export const queries = {
  ...authentication,
  ...tournaments,
  ...players,
  ...games
};