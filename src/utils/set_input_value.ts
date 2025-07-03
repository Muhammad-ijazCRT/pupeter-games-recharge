export const setInputValue = async (frame, selector, value) => {
    await frame.evaluate((elSelector, elValue) => {
        const element = document.querySelector(elSelector);
        if (!element) {
            throw new Error(`Element with selector "${elSelector}" not found.`);
        }

        if (element instanceof HTMLInputElement) {
            element.value = elValue;
            
            // Crear y disparar el evento 'input'
            const event = new Event('input', {
                'bubbles': true,
                'cancelable': true
            });
            element.dispatchEvent(event);
        } else {
            throw new Error(`Element with selector "${elSelector}" is not an input.`);
        }
    }, selector, value);
};