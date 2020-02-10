import {GET_TOURNAMENTS} from "./Tournament";
import {GET_PLAYERS} from "../components/PlayersPage/PlayersList";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";

export const CREATE_PLAYER = gql`
    mutation createPlayer($playerName: String!) {
        createPlayer(
            data: {
                name: $playerName
            }
        ) {
            id
            name
            pic
            tournaments {
                tournament {
                    id
                    name
                }
            }
        }
    }
`;