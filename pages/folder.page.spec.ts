import { expect, type Locator, type Page } from '@playwright/test';
import { loginData } from '../fixtures/logindata.spec';
import { HelpersPage } from '../helpers/helpers.spec';

export class TrialPage {
    trialPageLocator = {
        addbutton : '//span[@class="block"]',

    }
    constructor(public page: Page) {
    }

    async verifyTrialHomePage(){
        await expect(this.page.getByRole('main').getByText('Trials')).toBeVisible();
        await expect(this.page.locator('header')).toContainText('Trials');
        await expect(this.page.getByLabel('Expand "Add"')).toBeVisible();
        await expect(this.page.locator('button').filter({ hasText: 'chevron_left' })).toBeVisible();
        await expect(this.page.getByRole('textbox')).toBeVisible();
        await expect(this.page.locator('header').getByText('search')).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'protocol' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'name' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'owner' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'Tasks' })).toBeVisible();
        await expect(this.page.getByRole('cell', { name: 'Status' })).toBeVisible();
    }

    async createDeletefolder() {
        const helpers = new HelpersPage(this.page);
        await this.page.getByLabel('Expand "Add"').click();
        await this.page.getByText('folderFolder').click();
        await this.page.getByPlaceholder('Enter name...').click();
        let randomstring = await helpers.generateString(6);
        let foldername = "Automation Folder" + randomstring
        await this.page.getByPlaceholder('Enter name...').fill(foldername); 
        await this.page.getByPlaceholder('Enter code...').fill('New code');     
        await this.page.getByPlaceholder('Enter Description...').fill('New description');
        await this.page.getByPlaceholder('Enter keywords...').fill('keyword1');
        await this.page.getByPlaceholder('Enter keywords...').press('Enter');
        await this.page.getByRole('button', { name: 'create', exact: true }).click();
        await expect(this.page.getByText('No trials')).toBeVisible();
        await this.page.locator('button').filter({ hasText: 'arrow_back' }).click({force:true});
        await this.page.locator(`((//div[text()='${foldername}'])[1]/../../following-sibling::td//button[@type="button"])[2]`).click({force:true});
        await this.page.getByText('Delete', { exact: true }).click();
        await expect(this.page.getByText('Permanently Delete "')).toBeVisible();
        await expect(this.page.getByText('Are you sure you want to')).toBeVisible();
        await expect(this.page.getByText('To continue please write the')).toBeVisible();
        await this.page.getByLabel('Enter Delete...').fill('delete');
        await this.page.getByRole('button', { name: 'Delete' }).click();       
   }
    
}