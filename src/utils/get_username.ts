export const getUsername = async (dataTablePlayer) => {
    const colums = await dataTablePlayer.$$('td')
    const secondColum = colums[1];
    const currentScore = await secondColum.$eval('span', span => span.textContent.trim());
    return currentScore
}