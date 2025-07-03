import { waitParams } from "src/utils/params";
import { reloadPage } from "../browser/browserService";
import { BadRequestException } from "@nestjs/common";
import { setInputValue } from "src/utils/set_input_value";

export const login = async (data, page) => {
    console.log('Init login');
    const { username, password } = data
    let attempts: number[] = [1, 2];

    for (let attempt of attempts) {
        console.log("Attempt Login:", attempt)
        try {
            await page.waitForSelector('input[name="userName"]', waitParams);
            await page.$eval('input[name="userName"]', el => el.value = '');
            await page.$eval('input[name="passWd"]', el => el.value = '');

            await setInputValue(page, 'input[name="userName"]', username);
            await setInputValue(page, 'input[name="passWd"]', password);
            const btnLogin = await page.waitForSelector('button[type="button"]', waitParams);
            btnLogin.click();

            await page.waitForTimeout(1000);
            const currentUrl = await page.url();

            if (currentUrl === data.urlHome) {
                console.log('Finished login');
                break
            }

            if (attempt === attempts.length - 1) {
                await reloadPage()
                continue
            }

            if (attempt === attempts.length) {
                throw new BadRequestException("Login Failed")
            }

        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error
            } else if (attempt < attempts.length) {
                await reloadPage()
            } else {
                throw error
            }
        } finally {
            await page.waitForTimeout(1000);
        }
    }
}