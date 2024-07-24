
import { expect, type Locator, type Page } from '@playwright/test';
import { HelpersPage } from '../helpers/helpers.spec.ts';
import { stringify } from 'querystring';
export class AddGrowerPage {
    createGrowerLocator = {
        launchAgronomy :'//div[text()="Agronomy"]//..//span[text()="Launch"]',
        listMenuOption:'//div[@class="q-list top-menu"]',
        clickGrowerMenu:(option)=>`//div[@class="q-list top-menu"]//div[text()="${option}"]`,
        addButton:'//span[text()="Add"]',
        addSingleGrower:'//div[text()="Add a single grower"]',
        expandFarmCard:(card)=>`//i[text()="arrow_drop_down"]//..//..//div//div[text()="${card}"]`,
        farmerFirstName:'//span[text()="Farmer First Name"]//..//..//input[@type="text"]',
        farmerFirstLastName:'//span[text()="Farmer First Last Name"]//..//..//input[@type="text"]',
        country:'//span[text()="Country"]//..//..//input[@role="combobox"]',
        countryOption:(country)=>`//span[text()="${country}"]`,
        agronomist:'//span[text()="Agronomist"]//..//..//input[@role="combobox"]',
        agronomistOption:(name)=>  `//span[text()="${name}"]`,
        saveButton:'//span[text()="Save"]',
    }
    verifyGroOnList={
        searchButton:'//i[text()="search"]',
        searchField:'//i[text()="close"]//..//..//..//..//div//input[@type="text"]',
        verifySurveyName:(name)=>`//div[text()="${name}"]`
    }
    constructor(public page: Page) {
    }
    async clickAddGrower() {
        //await this.page.locator(this.createGrowerLocator.launchAgronomy).click();
        //await this.page.waitForTimeout(3000)
        //await this.page.locator(this.createGrowerLocator.launchAgronomy).click();
        await this.page.locator(this.createGrowerLocator.listMenuOption).hover();
        await this.page.locator(this.createGrowerLocator.clickGrowerMenu("Growers")).click();
        await this.page.locator(this.createGrowerLocator.addButton).waitFor({ state: 'visible' });
        await this.page.locator(this.createGrowerLocator.addButton).click();
        await this.page.locator(this.createGrowerLocator.addSingleGrower).click();
   }
   async fillGrowerBasicInfo(){
        //const helpersPage = new HelpersPage(this.page);
        //var farmName = "AutoGrower"+ helpersPage.generateString(3);
        await this.page.locator(this.createGrowerLocator.expandFarmCard("Farm")).waitFor({state:'visible'});
        await this.page.locator(this.createGrowerLocator.expandFarmCard("Farm")).click();
        await this.page.locator(this.createGrowerLocator.farmerFirstName).click();
       //console.log(farmName);
        await this.page.locator(this.createGrowerLocator.farmerFirstName).fill("farmName02");
        await this.page.waitForTimeout(5000)
        await this.page.locator(this.createGrowerLocator.farmerFirstLastName).click();
        await this.page.locator(this.createGrowerLocator.farmerFirstLastName).fill('test02');
        await this.page.locator(this.createGrowerLocator.country).click();
        //await this.page.locator(this.createGrowerLocator.country).selectOption('Afghanistan');
        await this.page.locator(this.createGrowerLocator.countryOption("Afghanistan")).click();
        await this.page.locator(this.createGrowerLocator.agronomist).scrollIntoViewIfNeeded();
        await this.page.locator(this.createGrowerLocator.agronomist).click();
        //await this.page.locator(this.createGrowerLocator.agronomist).selectOption('Roshani Group admin');
        await this.page.locator(this.createGrowerLocator.agronomistOption("Roshani Group admin")).click();
        await this.page.mouse.down();
        await this.page.locator(this.createGrowerLocator.saveButton).click();
        await this.page.waitForTimeout(5000)
        //return farmName;
   }
   async searchAndVerifyGrower () {
        //var fillMethod = JSON.stringify(this.fillGrowerBasicInfo());
        await this.page.locator(this.verifyGroOnList.searchButton).waitFor({state:'visible'});
        await this.page.locator(this.verifyGroOnList.searchButton).click();
        await this.page.locator(this.verifyGroOnList.searchField).click();
        await this.page.locator(this.verifyGroOnList.searchField).fill("farmName02");
        await expect(this.page.locator(this.verifyGroOnList.verifySurveyName("farmName02"))).toBeVisible();
        await this.page.waitForTimeout(1000);
   }
}
