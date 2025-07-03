import { Controller } from '@nestjs/common';
import { XGamesService } from './x-games.service';
import { EtypeTask } from 'src/enum/type.enum';
import { ReqGroupGameDTO } from 'src/interfaces/request.info';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { ENameGames } from 'src/enum/name-games.enum';
import { XGamesData } from './data/x-games.data';
import { Message } from '@aws-sdk/client-sqs';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';

@Controller()
export class XGamesController {

  constructor(
    private readonly xGamesService: XGamesService,
  ) { }

  @SqsMessageHandler(ENameGames.X_GAMES, true)
  async handleMessage(message: Message) {
    let body: ReqGroupGameDTO = JSON.parse(message[0]["Body"] || message?.Body);
    const infoGame: IGameInfoGroup2 | null = XGamesData || null

    //TODO: CRATE ACCOUNT */
    if (body.type === EtypeTask.CREATE_ACCOUNT) {

      await this.xGamesService.createAccount(body, infoGame);

      //TODO:  GAME POINTS */
    } else if (body.type === EtypeTask.GAME_POINTS || body.type === EtypeTask.EXTRACT_POINTS) {

      await this.xGamesService.movement(body, infoGame);

    }
  }
}
