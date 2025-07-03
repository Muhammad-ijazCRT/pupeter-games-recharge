import { Module } from '@nestjs/common';
import { AceBookService } from './ace-book.service';
import { AceBookController } from './ace-book.controller';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ServiceMovementModule } from 'src/microservices/service-movements/service-movements.module';
import { ServiceGameModule } from 'src/microservices/service-games/service-game.module';
import { ProducersModule } from 'src/producers/producers.module';
import { ENameGames } from 'src/enum/name-games.enum';
import { AWS_REGION, URL_SBS_ACE_BOOK } from 'src/config';
import { CreateAccountService } from './create-account.service';
import { MovementService } from './movement.service';

@Module({
  imports: [
    ProducersModule,
    ServiceGameModule,
    ServiceMovementModule,
    SqsModule.register({
      consumers: [
        {
          name: ENameGames.ACE_BOOK,
          queueUrl: URL_SBS_ACE_BOOK,
          region: AWS_REGION,
          batchSize: 1
        }
      ],
      producers: []
    }),
  ],
  controllers: [AceBookController],
  providers: [
    AceBookService,
    AceBookController,
    CreateAccountService,
    MovementService,
  ],
})
export class AceBookModule { }