import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configOptionsMicroservices } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'Movement Service',
                transport: Transport.TCP,
                options: configOptionsMicroservices('MOVEMENT')
            }
        ]),
    ],
    providers: [
        ClientsModule,
    ],
    exports: [
        ClientsModule,
    ],
})
export class ServiceMovementConnection { }