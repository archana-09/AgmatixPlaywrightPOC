import { expect, type Page } from '@playwright/test';

export class HelpersPage {
    constructor(private page: Page) {
    }

    acceptCookiesDialog = this.page.locator('#onetrust-banner-sdk');
    acceptCookiesButton = this.page.locator('button#onetrust-accept-btn-handler');

    async closeCookies() {
        await expect(this.acceptCookiesDialog).toBeVisible({ timeout: 15000 });
        await this.acceptCookiesButton.click();
    }

    async generateString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    async generateRandomNumberBetweenRanges(min, max) {
        this.page.evaluate('')
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}