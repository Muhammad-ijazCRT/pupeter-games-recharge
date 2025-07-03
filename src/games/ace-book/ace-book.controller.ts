
import { Controller } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import { ENameGames } from 'src/enum/name-games.enum';
import { Message } from '@aws-sdk/client-sqs';
import { ReqGroupGameDTO } from 'src/interfaces/request.info';
import { EtypeTask } from 'src/enum/type.enum';
import { AceBookService } from './ace-book.service';
import { AceBookData } from './data/ace-book.data';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';

@Controller()
export class AceBookController {
  constructor(private readonly aceBookService: AceBookService) { }

  @SqsMessageHandler(ENameGames.ACE_BOOK, true)
  async handleMessage(message: Message) {
    let body: ReqGroupGameDTO = JSON.parse(message[0]["Body"] || message?.Body);
    const infoGame: IGameInfoGroup2 | null = AceBookData || null

    //TODO: CRATE ACCOUNT */
    if (body.type === EtypeTask.CREATE_ACCOUNT) {

      await this.aceBookService.createAccount(body, infoGame);

      //TODO:  GAME POINTS */
    } else if (body.type === EtypeTask.GAME_POINTS || body.type === EtypeTask.EXTRACT_POINTS) {

      await this.aceBookService.movement(body, infoGame);

    }
  }
}
