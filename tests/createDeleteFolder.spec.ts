import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.spec';
import { TrialPage } from '../pages/folder.page.spec';
import { loginData } from '../fixtures/logindata.spec';
import { config } from '../fixtures/envconfig.spec';

const{QA1Url}=config[config.environment]


test.describe('Test Indirect Login Functions', () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.gotoUrl(QA1Url);
      await login.verifySignInPage();
      await login.login(loginData.devUserName, loginData.devpassword)
    })

    test('TC_01 - Create & Delete Folder', async ({ page }) => {
        const addTrial = new TrialPage(page);
        await  addTrial.createDeletefolder();
      });

});