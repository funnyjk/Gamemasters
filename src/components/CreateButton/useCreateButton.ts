import {useCreateGame} from '../GamesPage/CreateGame';
import {useCreatePlayer} from "../PlayersPage/CreatePlayer";
import {useCreateTournament} from "../TournamentsPage/CreateTournament";

const useCreateButton = (create: any) => {
  const createGame = useCreateGame("New Game");
  const createPlayer = useCreatePlayer("New Player");
  const createTournament = useCreateTournament("New Tournament");

  switch(create) {
    case "games":
      return createGame;
    case "players":
      return createPlayer;
    case "tournaments":
      return createTournament;
    default:
      return null;
  }
};

export default useCreateButton;