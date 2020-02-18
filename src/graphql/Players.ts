import {GET_TOURNAMENTS} from "./Tournament";
import {GET_PLAYERS} from "../components/PlayersPage/PlayersList";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";

export interface CREATE_PLAYER_VARS {
    playerName: string;
}

export const CREATE_PLAYER = gql`
    mutation createPlayerNoUser($playerName: String!) {
        createPlayerNoUser(
            name: $playerName
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