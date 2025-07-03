import { ENameGames } from "src/enum/name-games.enum";
import { EtypeTask } from "src/enum/type.enum";

export interface IMovements {
    mobileId: string;
    amount: number;
}

export interface ICreateAccount {
    username: string;
}

export interface ISuccessAccountCreated {
    _id: string;
    type: EtypeTask;
    game: ENameGames;
    gameMobileId: string;
    gamePassword: string;
}

export interface ReqGroupGameDTO {
    _id: string;
    game: ENameGames
    type: EtypeTask;
    data: ICreateAccount | IMovements;
}