export const clearInputValue = async (page, selector) => {
    await page.$eval(selector, el => el.value = '');
}
