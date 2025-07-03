import { Injectable } from '@nestjs/common';
import { getPage } from './browser/browserService';
import { ICreateAccount, ReqGroupGameDTO } from 'src/interfaces/request.info';
import { IGameInfoGroup2 } from 'src/interfaces/group-2.interface';
import { login } from './actions/login';
import { checkNotification } from './actions/checkStatus';
import { clickAddPlayerButton } from '../../utils/click_add_player_btn';
import { createUsername } from '../../utils/create-username-ult';
import { clearInputValue } from '../../utils/clearInputValue';
import { typeIntoInput } from '../../utils/type_into_input';
import { createPassword } from '../../utils/create-password-ult';
import { getUsername } from '../../utils/get_username';
import { serchTableInformationOfUser } from './actions/serch.user';

@Injectable()
export class CreateAccountService {
    async createAccount(body: ReqGroupGameDTO, infoGame: IGameInfoGroup2): Promise<any> {
        const data = body?.data as ICreateAccount
        const username = data.username

        // Obtain the page and its current URL
        const page = await getPage(infoGame.urlLogin);

        // Login in case is necessary
        const currentUrl = await page.url();

        if (currentUrl === infoGame.urlLogin) {
            await login(infoGame, page);
        } else {
            const status = await checkNotification(page);
            if (status) {
                await page.goto(infoGame.urlLogin)
                await page.waitForTimeout(1000);
                await login(infoGame, page);
            }
        }

        /**
        * Handles the redirection logic. If the user is already on the target page,
        * it won't redirect. Otherwise, it initiates the redirection based on the provided pattern.
        */

        if (currentUrl !== infoGame.urlCreate) {
            await page.goto(infoGame.urlCreate);
        }

        await page.waitForTimeout(1000);

        await clickAddPlayerButton(page)
        await page.waitForTimeout(500)

        //** Create Account **/
        const newUsername = await createUsername(username, "AB");
        const inputUsernameSelector = 'input[type="text"].el-input__inner[placeholder="Player’s account name (7-16 characters)"]';
        await clearInputValue(page, inputUsernameSelector);
        await typeIntoInput(page, inputUsernameSelector, newUsername);

        const password = await createPassword(username);
        const inputPasswordSelector = 'input[type="password"].el-input__inner';
        await clearInputValue(page, inputPasswordSelector);
        await typeIntoInput(page, inputPasswordSelector, password);

        const button = await page.$('button[data-v-52934f17][type="button"].el-button.el-button--primary.el-button--small');
        await button.click();
        await page.waitForTimeout(1000);

        //**Serch User */
        const dataTablePlayer = await serchTableInformationOfUser(newUsername, page)
        const usernameFound = await getUsername(dataTablePlayer)

        console.log("newUsername", newUsername)
        console.log("usernameFound", usernameFound)
        console.log("gamePassword", password)

        if (!usernameFound) {

            throw new Error("Username not found");

        }

        const res = {
            gameMobileId: usernameFound,
            gamePassword: password
        }

        return res
    }
}
