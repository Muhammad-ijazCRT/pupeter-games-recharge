import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { configOptionsMicroservices } from 'src/config';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'Game Service',
                transport: Transport.TCP,
                options: configOptionsMicroservices('GAME')
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
export class ServiceGameConnection { }