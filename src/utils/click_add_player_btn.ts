export const clickAddPlayerButton = async (page: any) => {
    await page.evaluate(() => {
        function findButtonToAddPlayer() {
            const buttons = document.querySelectorAll('button.el-button--medium');
            for (let button of buttons) {
                const span = button.querySelector('span');
                if (span && span.textContent.trim() === 'Add Player') {
                    return button;
                }
            }
            return null;
        }

        const button = findButtonToAddPlayer();
        if (button) {
            (button as HTMLElement).click();
        } else {
            throw new Error('Button "Add Player" not found.');
        }
    });
}
