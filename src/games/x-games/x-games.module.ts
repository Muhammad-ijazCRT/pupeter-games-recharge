import { Module } from '@nestjs/common';
import { XGamesService } from './x-games.service';
import { XGamesController } from './x-games.controller';
import { ENameGames } from 'src/enum/name-games.enum';
import { AWS_REGION, URL_SBS_X_GAMES } from 'src/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ServiceMovementModule } from 'src/microservices/service-movements/service-movements.module';
import { ServiceGameModule } from 'src/microservices/service-games/service-game.module';
import { ProducersModule } from 'src/producers/producers.module';
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
          name: ENameGames.X_GAMES,
          queueUrl: URL_SBS_X_GAMES,
          region: AWS_REGION,
          batchSize: 1
        }
      ],
      producers: []
    }),
  ],
  controllers: [XGamesController],
  providers: [
    XGamesService,
    CreateAccountService,
    MovementService,
    XGamesController
  ],
})
export class XGamesModule { }