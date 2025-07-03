import { Module } from '@nestjs/common';
import { GoldenCityController } from './golden-city.controller';
import { MovementService } from './movement.service';
import { CreateAccountService } from './create-account.service';
import { GoldenCityService } from './golden-city.service';
import { AWS_REGION, URL_SBS_GOLDEN_CITY } from 'src/config';
import { ENameGames } from 'src/enum/name-games.enum';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ServiceMovementModule } from 'src/microservices/service-movements/service-movements.module';
import { ServiceGameModule } from 'src/microservices/service-games/service-game.module';
import { ProducersModule } from 'src/producers/producers.module';

@Module({
  imports: [
    ProducersModule,
    ServiceGameModule,
    ServiceMovementModule,
    SqsModule.register({
      consumers: [
        {
          name: ENameGames.GOLDEN_CITY,
          queueUrl: URL_SBS_GOLDEN_CITY,
          region: AWS_REGION,
          batchSize: 1
        }
      ],
      producers: []
    }),
  ],
  controllers: [GoldenCityController],
  providers: [
    GoldenCityService,
    CreateAccountService,
    MovementService,
    GoldenCityController
  ],
})

export class GoldenCityModule { }
