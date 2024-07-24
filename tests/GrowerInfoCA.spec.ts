import { test, expect } from '@playwright/test';
import { CALoginPage } from '../pages/caLoginPage.spec';
import { loginData } from '../fixtures/logindata.spec';
import { config } from '../fixtures/envconfig.spec';
import { AddGrowerPage } from '../pages/addGrower.spec';

const{CADevUrl}=config[config.environment]

test.describe('Test create grower Functions', () => {
  test.beforeEach(async ({ page }) => {
    const login = new CALoginPage(page);
    await login.gotoUrl(CADevUrl);
    await login.verifySignInPage();
    await login.loginCA(loginData.caDevUserName, loginData.caDevPassword);
    })

    test('addgrower', async ({ page }) => {
    const addGrow = new AddGrowerPage(page);
    await addGrow.clickAddGrower();
    await addGrow.fillGrowerBasicInfo();
    await addGrow.searchAndVerifyGrower () 
    });
});