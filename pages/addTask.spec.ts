import {Trialdata} from '../fixtures/Trialdata.spec';
import { expect, type Locator, type Page } from '@playwright/test';

export class taskPage {
    taskPageLocator = {
        userNameField: '//input[@type="email"]',
        passwordField: '//input[@type="password"]',
        loginBtn: '//button[@type="submit"]',
        welComeAgmatixTitle: '.text-h5',
        welcomeAgmatixTitle1: 'From Hypothesis to'

    }
    constructor(public page: Page) {
    }

async addTask(){
  await expect(this.page.getByText('Tasks', { exact: true })).toBeVisible();
  await expect(this.page.getByText('Layout')).toBeVisible();
  await this.page.getByRole('button', { name: 'Add' }).first().click();
  await this.page.getByPlaceholder('Enter task name...').click();
  await this.page.getByPlaceholder('Enter task name...').fill('Automation Task');
  await this.page.getByRole('main').getByLabel('Expand').click();
  await this.page.getByText('Data collection').click();
  await this.page.getByPlaceholder('Select assignees..').click();
  await this.page.getByText('manish.pal@agmatix.com').click();
  await this.page.getByRole('button', { name: 'Add' }).first().click();
  await this.page.getByText('Statistics2').click();
    }
}
