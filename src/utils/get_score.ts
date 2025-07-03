
export const getScore = async (dataTablePlayer) => {
    const colums = await dataTablePlayer.$$('td')
    const secondColum = colums[5];
    const currentScore = await secondColum.$eval('span', span => span.textContent.trim());
    return currentScore
}