import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { ISuccessAccountCreated } from "src/interfaces/request.info"

@Injectable()
export class ServiceGameRepository {
  constructor(
    @Inject('Game Service')
    private readonly serviceGame: ClientProxy,
  ) { }

  async sendCreateAccountSucces(params: ISuccessAccountCreated) {
    this.serviceGame.emit('succes-create-account-event', params)
  }

}