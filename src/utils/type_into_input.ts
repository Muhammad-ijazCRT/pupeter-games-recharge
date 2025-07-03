export const typeIntoInput = async (page, selector, value) => {
    const inputElement = await page.$(selector);
    if(inputElement) {
        await inputElement.type(value);
    } else {
        throw new Error(`Element with selector "${selector}" not found.`);
    }
}