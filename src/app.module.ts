import { Module } from '@nestjs/common';
import { XGamesModule } from './games/x-games/x-games.module';
import { UltraPandaModule } from './games/ultra-panda/ultra-panda.module';
import { GoldenCityModule } from './games/golden-city/golden-city.module';
import { AceBookModule } from './games/ace-book/ace-book.module';
import { VPowerModule } from './games/v-power/v-power.module';


@Module({
  imports: [
    XGamesModule,
    UltraPandaModule,
    GoldenCityModule,
    AceBookModule,
    VPowerModule
  ],
  controllers: [],
})
export class AppModule { }
