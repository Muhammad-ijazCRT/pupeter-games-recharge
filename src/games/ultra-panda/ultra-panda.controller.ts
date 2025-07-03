
import { Controller } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { ENameGames } from 'src/enum/name-games.enum';
import { Message } from '@aws-sdk/client-sqs';
import { ReqGroupGameDTO } from 'src/interfaces/request.info';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';
import { EtypeTask } from 'src/enum/type.enum';
import { UltraPandaService } from './ultra-panda.service';
import { ULtraPandaData } from './data/ultra-panda.data';

@Controller()
export class UltraPandaController {
  constructor(private readonly ultraPandaService: UltraPandaService) { }

  @SqsMessageHandler(ENameGames.ULTRA_PANDA, true)
  async handleMessage(message: Message) {
    let body: ReqGroupGameDTO = JSON.parse(message[0]["Body"] || message?.Body);
    const infoGame: IGameInfoGroup2 | null = ULtraPandaData || null

    //TODO: CRATE ACCOUNT */
    if (body.type === EtypeTask.CREATE_ACCOUNT) {

      await this.ultraPandaService.createAccount(body, infoGame);

      //TODO:  GAME POINTS */
    } else if (body.type === EtypeTask.GAME_POINTS || body.type === EtypeTask.EXTRACT_POINTS) {

      await this.ultraPandaService.movement(body, infoGame);

    }
  }
}
