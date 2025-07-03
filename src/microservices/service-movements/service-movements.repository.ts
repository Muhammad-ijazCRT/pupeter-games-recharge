import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { ReqGroupGameDTO } from "src/interfaces/request.info"
@Injectable()
export class ServiceMovementRepository {
  constructor(
    @Inject('Movement Service')
    private readonly serviceMovement: ClientProxy,
  ) { }

  async sendApprovedMovement(params: ReqGroupGameDTO) {
    this.serviceMovement.emit('succes-processed-movement-bot', params)
  }
}