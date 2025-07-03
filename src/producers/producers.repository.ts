import { Injectable } from "@nestjs/common";
import { ReqGroupGameDTO } from "src/interfaces/request.info";
import { SqsService } from '@ssut/nestjs-sqs';
import { SBS_NAME_DLQ_CREATE_ACCOUNT, SBS_NAME_DLQ_MOVEMENTS } from "src/config";

@Injectable()
export class ProducersRepository {

    constructor(
        private readonly sqsService: SqsService
    ) { }

    async sendDLQCreateAccount(Params: ReqGroupGameDTO) {
        try {
            await this.sqsService.send(SBS_NAME_DLQ_CREATE_ACCOUNT, {
                id: Params._id,
                body: Params
            });
            
        } catch (error) {
            return { error }
        }
    }

    async sendDLQMovements(Params: ReqGroupGameDTO) {
        try {
            await this.sqsService.send(SBS_NAME_DLQ_MOVEMENTS, {
                id: Params._id,
                body: Params
            })
        } catch (error) {
            return { error }
        }
    }
}