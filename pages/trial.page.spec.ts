import {Trialdata} from '../fixtures/Trialdata.spec';
import { expect, type Locator, type Page } from '@playwright/test';
import { HelpersPage } from '../helpers/helpers.spec';


let  foldername = "";
export class trialPage {
    trialPageLocator = {
        addbutton : '//span[@class="block"]',
        createTrial : '#create-trial-button',
        leftMenuOption: `//div[text() = $"{menuName}"]`

    }
    constructor(public page: Page) {
    }
   

   // 

async createTrial() {
    const helpers = new HelpersPage(this.page);
   await this.page.locator(this.trialPageLocator.addbutton).click();
   await this.page.getByText('Trial', { exact: true }).click();
   await this.page.getByRole('button', { name: 'Create trial' }).click();
   const alertmessage =  await this.page.locator("[role*='alert']").textContent();
   await expect(this.page.locator("[role*='alert']")).toContainText('Required field');
   let randomstring = await helpers.generateString(6);
   foldername = "Automation Trial" + randomstring
   await this.page.getByPlaceholder('Enter trial name...').fill(foldername);
   await this.page.locator('#q-portal--dialog--2').getByLabel('Expand').click();
   await this.page.getByText(Trialdata.Crops[0]).click();
   await this.page.getByRole('button', { name: 'Apply' }).click();
   await this.page.getByPlaceholder('Type').click();
   await this.page.locator('//div[@role="option"][1]').click();
   await this.page.locator(this.trialPageLocator.createTrial).click();
   //await this.page.getByRole('button', { name: 'Create trial' }).click({force:true});
   await expect(this.page.getByText('Great, your trial is ready!')).toBeVisible();
   await expect(this.page.getByText('We suggest you to start')).toBeVisible();
   await expect(this.page.locator('#q-portal--dialog--5 ellipse').nth(1)).toBeVisible();
   await this.page.getByRole('button', { name: 'Done' }).click();
   console.log(foldername)
  
  
    }  

async deleteTrial(){

        await this.page.locator('//i[text()="arrow_back"]/../..').click();
   // await this.page.locator('button').filter({ hasText: 'arrow_back' }).click({force:true});
        await this.page.locator(`((//div[text()='${foldername}'])[1]/../../following-sibling::td//button[@type="button"])[2]`).click({force:true});
        await this.page.getByText('Delete', { exact: true }).click();
        await expect(this.page.getByText('Permanently Delete "')).toBeVisible();
        await expect(this.page.getByText('Are you sure you want to')).toBeVisible();
        await expect(this.page.getByText('To continue please write the')).toBeVisible();
        await this.page.getByLabel('Enter Delete...').fill('delete');
        await this.page.getByRole('button', { name: 'Delete' }).click({force:true});

   }
}
