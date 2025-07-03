import { Module } from '@nestjs/common';
import { ServiceMovementRepository } from './service-movements.repository';
import { ServiceMovementConnection } from 'src/connections/service-movements.connection';

@Module({
	imports: [ServiceMovementConnection],
	providers: [ServiceMovementRepository],
	exports: [ServiceMovementRepository],
})
export class ServiceMovementModule { }