import { expect, type Locator, type Page } from '@playwright/test';


export class CALoginPage {
    loginPageLocator = {
        userNameField: '//input[@type="email"]',
        passwordField: '//input[@type="password"]',
        loginBtn: '//button[@type="submit"]',
        welComeAgmatixTitle: '.text-h5',
        welcomeAgmatixTitle1: 'From Hypothesis to'

    }
    constructor(public page: Page) {
    }
    async gotoUrl(url) {
        await this.page.goto(url);
    }
    async verifySignInPage() {
       await expect(this.page.getByText('Login').first()).toBeVisible();
       await expect(this.page).toHaveTitle("CA.agmatix");
   }
   async enterUserName(userName) {
        await this.page.locator(this.loginPageLocator.userNameField).click();
        await this.page.locator(this.loginPageLocator.userNameField).fill(userName);
    }
    async enterPassword(password) {
        await this.page.locator(this.loginPageLocator.passwordField).click();
        await this.page.locator(this.loginPageLocator.passwordField).fill(password);
    }
    async clickOnButton() {
        await this.page.locator(this.loginPageLocator.loginBtn).click({ force: true });
    }
    async loginCA(userName, password) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickOnButton();
    }

}