import { ENameGames } from "src/enum/name-games.enum";

export interface IGameInfo {
    urlLogin: string;
    username: string;
    password: string;
    urlCreate: string;
    textCreate: string;
    name: ENameGames;
    suffix: string;
}

