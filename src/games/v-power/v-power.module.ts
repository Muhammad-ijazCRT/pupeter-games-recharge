import { Module } from '@nestjs/common';
import { VPowerService } from './v-power.service';
import { VPowerController } from './v-power.controller';
import { ProducersModule } from 'src/producers/producers.module';
import { ServiceGameModule } from 'src/microservices/service-games/service-game.module';
import { ServiceMovementModule } from 'src/microservices/service-movements/service-movements.module';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ENameGames } from 'src/enum/name-games.enum';
import { AWS_REGION, URL_SBS_V_POWER } from 'src/config';
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
          name: ENameGames.V_POWER,
          queueUrl: URL_SBS_V_POWER,
          region: AWS_REGION,
          batchSize: 1
        }
      ],
      producers: []
    }),
  ],
  controllers: [VPowerController],
  providers: [
    VPowerService,
    CreateAccountService,
    MovementService,
    VPowerController
  ],
})
export class VPowerModule { }
