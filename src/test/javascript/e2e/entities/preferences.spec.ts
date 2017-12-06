import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Preferences e2e test', () => {

    let navBarPage: NavBarPage;
    let preferencesDialogPage: PreferencesDialogPage;
    let preferencesComponentsPage: PreferencesComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Preferences', () => {
        navBarPage.goToEntity('preferences');
        preferencesComponentsPage = new PreferencesComponentsPage();
        expect(preferencesComponentsPage.getTitle()).toMatch(/twentyOnePointsApp.preferences.home.title/);

    });

    it('should load create Preferences dialog', () => {
        preferencesComponentsPage.clickOnCreateButton();
        preferencesDialogPage = new PreferencesDialogPage();
        expect(preferencesDialogPage.getModalTitle()).toMatch(/twentyOnePointsApp.preferences.home.createOrEditLabel/);
        preferencesDialogPage.close();
    });

    it('should create and save Preferences', () => {
        preferencesComponentsPage.clickOnCreateButton();
        preferencesDialogPage.setWeeklyGoalInput('5');
        expect(preferencesDialogPage.getWeeklyGoalInput()).toMatch('5');
        preferencesDialogPage.weightUnitsSelectLastOption();
        preferencesDialogPage.userSelectLastOption();
        preferencesDialogPage.save();
        expect(preferencesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class PreferencesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-preferences div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class PreferencesDialogPage {
    modalTitle = element(by.css('h4#myPreferencesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    weeklyGoalInput = element(by.css('input#field_weeklyGoal'));
    weightUnitsSelect = element(by.css('select#field_weightUnits'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setWeeklyGoalInput = function (weeklyGoal) {
        this.weeklyGoalInput.sendKeys(weeklyGoal);
    }

    getWeeklyGoalInput = function () {
        return this.weeklyGoalInput.getAttribute('value');
    }

    setWeightUnitsSelect = function (weightUnits) {
        this.weightUnitsSelect.sendKeys(weightUnits);
    }

    getWeightUnitsSelect = function () {
        return this.weightUnitsSelect.element(by.css('option:checked')).getText();
    }

    weightUnitsSelectLastOption = function () {
        this.weightUnitsSelect.all(by.tagName('option')).last().click();
    }
    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
