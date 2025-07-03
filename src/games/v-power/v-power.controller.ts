import { Controller } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { ENameGames } from 'src/enum/name-games.enum';
import { Message } from '@aws-sdk/client-sqs';
import { ReqGroupGameDTO } from 'src/interfaces/request.info';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';
import { EtypeTask } from 'src/enum/type.enum';
import { VPowerService } from './v-power.service';
import { VPowerData } from './data/v-power.data';

@Controller()
export class VPowerController {
  constructor(private readonly vPowerService: VPowerService) { }

  @SqsMessageHandler(ENameGames.V_POWER, true)
  async handleMessage(message: Message) {
    let body: ReqGroupGameDTO = JSON.parse(message[0]["Body"] || message?.Body);
    const infoGame: IGameInfoGroup2 | null = VPowerData || null

    //TODO: CRATE ACCOUNT */
    if (body.type === EtypeTask.CREATE_ACCOUNT) {

      await this.vPowerService.createAccount(body, infoGame);

      //TODO:  GAME POINTS */
    } else if (body.type === EtypeTask.GAME_POINTS || body.type === EtypeTask.EXTRACT_POINTS) {

      await this.vPowerService.movement(body, infoGame);

    }
  }
}
