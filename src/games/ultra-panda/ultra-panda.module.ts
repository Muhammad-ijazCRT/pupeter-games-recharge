import { Module } from '@nestjs/common';
import { UltraPandaService } from './ultra-panda.service';
import { UltraPandaController } from './ultra-panda.controller';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ProducersModule } from 'src/producers/producers.module';
import { ENameGames } from 'src/enum/name-games.enum';
import { AWS_REGION, URL_SBS_ULTRA_PANDA } from 'src/config';
import { ServiceGameModule } from 'src/microservices/service-games/service-game.module';
import { ServiceMovementModule } from 'src/microservices/service-movements/service-movements.module';
import { MovementService } from './movement.service';
import { CreateAccountService } from './create-account.service';

@Module({
  imports: [
    ProducersModule,
    ServiceGameModule,
    ServiceMovementModule,
    SqsModule.register({
      consumers: [
        {
          name: ENameGames.ULTRA_PANDA,
          queueUrl: URL_SBS_ULTRA_PANDA,
          region: AWS_REGION,
          batchSize: 1
        }
      ],
      producers: []
    }),
  ],
  controllers: [UltraPandaController],
  providers: [
    UltraPandaService,
    MovementService,
    CreateAccountService,
    UltraPandaController
  ],
})
export class UltraPandaModule { }
