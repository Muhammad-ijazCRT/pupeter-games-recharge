import { Controller } from '@nestjs/common';
import { GoldenCityService } from './golden-city.service';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { ENameGames } from 'src/enum/name-games.enum';
import { Message } from '@aws-sdk/client-sqs';
import { ReqGroupGameDTO } from 'src/interfaces/request.info';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';
import { GoldenCityData } from './data/golden-city.data';
import { EtypeTask } from 'src/enum/type.enum';

@Controller()
export class GoldenCityController {
  constructor(private readonly goldenCityService: GoldenCityService) { }

  @SqsMessageHandler(ENameGames.GOLDEN_CITY, true)
  async handleMessage(message: Message) {
    let body: ReqGroupGameDTO = JSON.parse(message[0]["Body"] || message?.Body);
    const infoGame: IGameInfoGroup2 | null = GoldenCityData || null

    //TODO: CRATE ACCOUNT */
    if (body.type === EtypeTask.CREATE_ACCOUNT) {

      await this.goldenCityService.createAccount(body, infoGame);

      //TODO:  GAME POINTS */
    } else if (body.type === EtypeTask.GAME_POINTS || body.type === EtypeTask.EXTRACT_POINTS) {

      await this.goldenCityService.movement(body, infoGame);

    }
  }
}
