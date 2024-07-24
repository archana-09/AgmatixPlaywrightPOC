import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.spec';
import { TrialPage } from '../pages/folder.page.spec';
import { loginData } from '../fixtures/logindata.spec';
import { config } from '../fixtures/envconfig.spec';
import {Trialdata} from '../fixtures/Trialdata.spec';
import {trialPage} from '../pages/trial.page.spec'
import {taskPage} from '../pages/addTask.spec'

const{QA1Url}=config[config.environment]


test.describe('Add Task in Trial', () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.gotoUrl(QA1Url);
      await login.verifySignInPage();
      await login.login(loginData.devUserName, loginData.devpassword)
    })

    test('TC_01 - Add Task', async ({ page }) => {
        const onTrialPage = new trialPage(page);
        await onTrialPage.createTrial();
        const onTaskPage = new taskPage(page);
        await  onTaskPage.addTask();
      });

});