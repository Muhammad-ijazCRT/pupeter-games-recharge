import { reloadPage } from "../browser/browserService";

export const serchTableInformationOfUser = async (value, page) => {

    let attempts: number[] = [1, 2];

    for (let attempt of attempts) {
        console.log("Attempt Find Information:", attempt)
        const selector = 'input[type="text"].el-input__inner[placeholder="Search..."]';

        //Clean input
        await page.$eval(selector, el => el.value = '');
        const inputElement = await page.$(selector);

        if (inputElement) {
            await inputElement.type(String(value));
            await inputElement.type(String.fromCharCode(13));

            /** In case be form */
            const btnXpathBack = '//button[@data-v-382e30e2 and contains(@class, "el-button--medium") and .//span[text()="Back"]]';
            const btnElements = await page.$x(btnXpathBack);

            if (btnElements.length) {
                const isVisible = await btnElements[0].isIntersectingViewport();
                if (isVisible) {
                    await btnElements[0].click();
                }
            }

            await page.waitForTimeout(1000);
            const tables = await page.$$('tr.el-table__row')
            const thirdTable = tables[2];

            if (!thirdTable) {
                await reloadPage()
            } else {
                console.log("User found ")
                return thirdTable
            }

            if (attempt === 2) {
                throw new Error("User not found")
            }
        }

    }
}