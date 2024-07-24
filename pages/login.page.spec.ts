import { expect, type Locator, type Page } from '@playwright/test';
import { loginData } from '../fixtures/logindata.spec';

export class LoginPage {
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
        await expect(this.page.getByRole('img', { name: 'app logo' })).toBeVisible();
        await expect(this.page.getByText('Agronomic Trial Management')).toBeVisible();
        await expect(this.page.getByText('From Hypothesis to')).toBeVisible();
        await expect(this.page).toHaveTitle("Agronomic Trial Management Platform");
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

    
    async login(userName, password) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickOnButton();
    }

    async verifyblankCredentials() {
        await this.clickOnButton();
    }
    async verifyloginWithinvalidEmail(userName) {
        await this.enterUserName(userName);
        await this.clickOnButton();
        const alertmessage =  await this.page.locator("[role*='alert']").textContent();
        await expect(this.page.locator("[role*='alert']")).toContainText('Not a valid email');
        
    }

    async verifyloginWithinvalidPassword(userName, password) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickOnButton();
        await expect(this.page.getByText('Login Failed')).toBeVisible();
        await expect(this.page.getByText('Login credentials are')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
    }
}
