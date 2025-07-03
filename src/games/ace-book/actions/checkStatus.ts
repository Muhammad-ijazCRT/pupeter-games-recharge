export const checkNotification = async (page) => {
    try {
        const notification = await page.waitForSelector('div.el-message-box__wrapper', { visible: true, timeout: 1000 })

        if (notification) {
            const isVisible = await notification.isIntersectingViewport();
            if (isVisible) {
                return true
            } else {
                return false
            }
        }
        return true
    } catch {
        return false
    }
}
