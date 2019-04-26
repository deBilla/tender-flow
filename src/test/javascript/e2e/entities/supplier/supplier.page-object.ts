import { element, by, ElementFinder } from 'protractor';

export class SupplierComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-supplier div table .btn-danger'));
    title = element.all(by.css('jhi-supplier div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class SupplierUpdatePage {
    pageTitle = element(by.id('jhi-supplier-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    companyInput = element(by.id('field_company'));
    suppRespInput = element(by.id('file_suppResp'));
    loginSelect = element(by.id('field_login'));
    supplierResponseSelect = element(by.id('field_supplierResponse'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setCompanyInput(company) {
        await this.companyInput.sendKeys(company);
    }

    async getCompanyInput() {
        return this.companyInput.getAttribute('value');
    }

    async setSuppRespInput(suppResp) {
        await this.suppRespInput.sendKeys(suppResp);
    }

    async getSuppRespInput() {
        return this.suppRespInput.getAttribute('value');
    }

    async loginSelectLastOption() {
        await this.loginSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async loginSelectOption(option) {
        await this.loginSelect.sendKeys(option);
    }

    getLoginSelect(): ElementFinder {
        return this.loginSelect;
    }

    async getLoginSelectedOption() {
        return this.loginSelect.element(by.css('option:checked')).getText();
    }

    async supplierResponseSelectLastOption() {
        await this.supplierResponseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async supplierResponseSelectOption(option) {
        await this.supplierResponseSelect.sendKeys(option);
    }

    getSupplierResponseSelect(): ElementFinder {
        return this.supplierResponseSelect;
    }

    async getSupplierResponseSelectedOption() {
        return this.supplierResponseSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class SupplierDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-supplier-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-supplier'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
