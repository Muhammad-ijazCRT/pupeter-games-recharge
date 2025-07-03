import { Injectable } from '@nestjs/common';
import { IMovements, ReqGroupGameDTO } from 'src/interfaces/request.info';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';
import { EtypeTask } from 'src/enum/type.enum';
import { getPage, reloadPage } from './browser/browserService';
import { login } from './actions/login';
import { checkNotification } from './actions/checkStatus';
import { serchTableInformationOfUser } from './actions/serch.user';
import { getScore } from '../../utils/get_score';
import { BadRequestException } from '@nestjs/common';
import { waitParams } from 'src/utils/params';
import { clearInputValue } from '../../utils/clearInputValue';
import { typeIntoInput } from '../../utils/type_into_input';

let initialAmountGeneral

@Injectable()
export class MovementService {

    async movement(body: ReqGroupGameDTO, data: IGameInfoGroup2, attempt: number) {
        // Obtain the page and its current URL
        const { mobileId, amount } = body.data as IMovements;

        console.log("Type Operation: ", body.type)
        console.log("amount: ", amount)
        console.log("mobileId: ", mobileId)

        const requestAmount = (body.type === EtypeTask.GAME_POINTS) ? amount : amount * -1

        const page = await getPage(data.urlLogin);
        await reloadPage()
        // Login in case is necessary
        const currentUrl = await page.url();

        if (currentUrl === data.urlLogin) {
            await login(data, page);
        } else {
            const status = await checkNotification(page);
            if (status) {
                await page.goto(data.urlLogin)
                await page.waitForTimeout(1000);
                await login(data, page);
            }
        }

        //**Serch User */
        const dataTablePlayer = await serchTableInformationOfUser(mobileId, page)
        const initialAmount = await getScore(dataTablePlayer)
        console.log("initialAmount: ", initialAmount)

        if (attempt !== 1 && initialAmountGeneral) {
            if (body.type === EtypeTask.GAME_POINTS) {
                if (parseInt(initialAmount) === parseInt(initialAmountGeneral) + amount) {
                    console.log("finalAmount: ", initialAmount)
                    initialAmountGeneral = null
                    return {
                        mobileId,
                        amount,
                        initialAmount,
                        finalAmount: initialAmount
                    }
                }
            } else {
                if (parseInt(initialAmount) === parseInt(initialAmountGeneral) - amount) {
                    console.log("finalAmount: ", initialAmount)

                    initialAmountGeneral = null
                    return {
                        mobileId,
                        amount,
                        initialAmount,
                        finalAmount: initialAmount
                    }
                }
            }
        }

        initialAmountGeneral = initialAmount

        if (requestAmount < 0 && amount > parseInt(initialAmount || 0)) {
            throw new BadRequestException("The user does not have the necessary points")
        }

        //** Open Form **//
        const btnXpath = '//button[contains(@class, "el-button") and .//span[text()="Set Score"]]';
        await page.waitForSelector(".el-button", waitParams);
        const btnSetScore = await page.$x(btnXpath);
        const buttonSetScore = btnSetScore[0] as any;
        await buttonSetScore.click();
        await page.waitForTimeout(500);

        //** input Points and save**//
        const inputPointsSelector = 'input[type="text"][placeholder="Set points : ie 100"]';
        await clearInputValue(page, inputPointsSelector);
        await typeIntoInput(page, inputPointsSelector, requestAmount.toString());

        const btnXpathOK = '//button[@data-v-382e30e2 and contains(@class, "el-button--primary") and .//span[text()="OK"]]';
        let btnElements = await page.$x(btnXpathOK);
        if (!btnElements[0]) {
            const xpathSelector = "//button[.//span[contains(text(), 'OK')]]";
            btnElements = await page.$x(xpathSelector)
        }
        const buttonElement = btnElements[0] as any;
        await buttonElement.click();

        await reloadPage()

        //** Check if the operation was performed correctly */
        const NewDataTablePlayer = await serchTableInformationOfUser(mobileId, page)
        const finalAmount = await getScore(NewDataTablePlayer)

        let status = false
        if (body.type === EtypeTask.GAME_POINTS) {
            if (parseInt(finalAmount) === parseInt(initialAmount) + amount) {
                status = true
            }
        } else {
            if (parseInt(finalAmount) === parseInt(initialAmount) - amount) {
                status = true
            }
        }

        if (!status) {
            throw new BadRequestException("Error Task")
        }
        
        console.log("finalAmount: ", finalAmount)

        initialAmountGeneral = null
        return {
            mobileId,
            amount,
            initialAmount,
            finalAmount
        }
    }

}
