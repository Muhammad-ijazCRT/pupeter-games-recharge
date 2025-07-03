import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { AWS_REGION, SBS_NAME_DLQ_CREATE_ACCOUNT, SBS_NAME_DLQ_MOVEMENTS, URL_SBS_DLQ_CREATE_ACCOUNT, URL_SBS_DLQ_MOVEMENTS } from 'src/config';
import { ProducersRepository } from './producers.repository';

@Module({
    imports: [
        SqsModule.register({
            consumers: [],
            producers: [
                {
                    name: SBS_NAME_DLQ_CREATE_ACCOUNT,
                    queueUrl: URL_SBS_DLQ_CREATE_ACCOUNT,
                    region: AWS_REGION
                },
                {
                    name: SBS_NAME_DLQ_MOVEMENTS,
                    queueUrl: URL_SBS_DLQ_MOVEMENTS,
                    region: AWS_REGION
                }
            ],
        }),
    ],
    providers: [ProducersRepository],
    exports: [ProducersRepository]
})
export class ProducersModule { }
