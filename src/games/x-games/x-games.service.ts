import { Injectable } from '@nestjs/common';
import { ServiceGameRepository } from 'src/microservices/service-games/service-game.repository';
import { CreateAccountService } from './create-account.service';
import { ISuccessAccountCreated, ReqGroupGameDTO } from 'src/interfaces/request.info';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';
import { ProducersRepository } from 'src/producers/producers.repository';
import { restBrowser } from './browser/browserService';
import { ServiceMovementRepository } from 'src/microservices/service-movements/service-movements.repository';
import { MovementService } from './movement.service';

@Injectable()
export class XGamesService {

    constructor(
        private readonly createAccountService: CreateAccountService,
        private readonly producersRepository: ProducersRepository,
        private readonly serviceGameRepository: ServiceGameRepository,
        private readonly serviceMovementRepository: ServiceMovementRepository,
        private readonly movementService: MovementService
    ) { }

    async createAccount(body: ReqGroupGameDTO, infoGame: IGameInfoGroup2): Promise<any> {
        console.log(`🚹 ${infoGame.name}  --- > Create Account 💥`);
        let attempts: number[] = [1, 2, 3];

        for (let attempt of attempts) {
            try {
                const res = await this.createAccountService.createAccount(body, infoGame);
                console.log(`✅ Account Created Succesfull ${infoGame.name} 💥`)
                const params: ISuccessAccountCreated = {
                    _id: body._id,
                    type: body.type,
                    game: body.game,
                    gameMobileId: res.gameMobileId,
                    gamePassword: res.gamePassword
                }

                await this.serviceGameRepository.sendCreateAccountSucces(params)
                break
            } catch (error) {
                console.log("❌ " + error?.message + infoGame.name + " 💥");
                if (attempt === attempts.length) {
                    await this.producersRepository.sendDLQCreateAccount(body)
                } else {
                    await restBrowser()
                }
            }
        }

    }

    async movement(body: ReqGroupGameDTO, infoGame: IGameInfoGroup2): Promise<any> {
        console.log(`💵 ${infoGame.name}  --- > Movement 💥`);
        let attempts: number[] = [1, 2, 3];

        for (let attempt of attempts) {
            console.log("Attempt Navigator: ", attempt)
            try {
                await this.movementService.movement(body, infoGame, attempt);
                console.log(`✅ Movement Succesfull ${infoGame.name} 💥`)
                await this.serviceMovementRepository.sendApprovedMovement(body)
                break
            } catch (error) {
                console.log("❌ " + error?.message + infoGame.name + " 💥");
                if (error?.message === "The user does not have the necessary points") {
                    await this.producersRepository.sendDLQMovements(body)
                    break
                } else if (error?.message === "Error Task") {
                    await this.producersRepository.sendDLQMovements(body)
                    break
                } else if (attempt === attempts.length) {
                    await this.producersRepository.sendDLQMovements(body)
                    break
                } else {
                    await restBrowser()
                }
            }
        }
    }
}
