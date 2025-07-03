import { Module } from '@nestjs/common';
import { ServiceGameRepository } from './service-game.repository';
import { ServiceGameConnection } from 'src/connections/service-games.connection';

@Module({
	imports: [ServiceGameConnection],
	providers: [ServiceGameRepository],
	exports: [ServiceGameRepository],
})
export class ServiceGameModule { }