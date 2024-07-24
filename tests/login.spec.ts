import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.spec';
import { loginData } from '../fixtures/logindata.spec';
import { config } from '../fixtures/envconfig.spec';
const{QA1Url}=config[config.environment]


test.describe('Test Login feature for TM', () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.gotoUrl(QA1Url);
    })

    test('TC_01 - Verify Sign in page', async ({ page }) => {
        const login = new LoginPage(page);
        await login.verifySignInPage();
        await  expect(page.getByRole('main').getByText('Trials')).toBeVisible();
        await expect(page.locator('header')).toContainText('Trials');
        await expect(page.getByLabel('Expand "Add"')).toBeVisible();
        await expect(page.locator('button').filter({ hasText: 'chevron_left' })).toBeVisible();
        await expect(page.getByRole('textbox')).toBeVisible();
        await expect(page.locator('header').getByText('search')).toBeVisible();
      });

      test('TC_02 - User try to Login with Valid Credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.verifySignInPage();
        await login.login(loginData.devUserName, loginData.devpassword)
        await  expect(page.getByRole('main').getByText('Trials')).toBeVisible();
        await expect(page.locator('header')).toContainText('Trials');
        await expect(page.getByLabel('Expand "Add"')).toBeVisible();
        await expect(page.locator('button').filter({ hasText: 'chevron_left' })).toBeVisible();
        await expect(page.getByRole('textbox')).toBeVisible();
        await expect(page.locator('header').getByText('search')).toBeVisible();
      });

      test('TC_03 - User try to Login with InvalidValid Email', async ({ page }) => {
        const login = new LoginPage(page);
        await login.verifySignInPage();
        await login.verifyloginWithinvalidEmail(loginData.devinvalidUserName)
      });

      test('TC_04 - User try to Login with InvalidValid Password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.verifySignInPage();
        await login.login(loginData.devUserName, loginData.devInvalidpassword)
      });

    });