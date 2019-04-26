/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SupplierComponentsPage, SupplierDeleteDialog, SupplierUpdatePage } from './supplier.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Supplier e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let supplierUpdatePage: SupplierUpdatePage;
    let supplierComponentsPage: SupplierComponentsPage;
    let supplierDeleteDialog: SupplierDeleteDialog;
    const fileNameToUpload = 'logo-jhipster.png';
    const fileToUpload = '../../../../../main/webapp/content/images/' + fileNameToUpload;
    const absolutePath = path.resolve(__dirname, fileToUpload);

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Suppliers', async () => {
        await navBarPage.goToEntity('supplier');
        supplierComponentsPage = new SupplierComponentsPage();
        await browser.wait(ec.visibilityOf(supplierComponentsPage.title), 5000);
        expect(await supplierComponentsPage.getTitle()).to.eq('Suppliers');
    });

    it('should load create Supplier page', async () => {
        await supplierComponentsPage.clickOnCreateButton();
        supplierUpdatePage = new SupplierUpdatePage();
        expect(await supplierUpdatePage.getPageTitle()).to.eq('Create or edit a Supplier');
        await supplierUpdatePage.cancel();
    });

    it('should create and save Suppliers', async () => {
        const nbButtonsBeforeCreate = await supplierComponentsPage.countDeleteButtons();

        await supplierComponentsPage.clickOnCreateButton();
        await promise.all([
            supplierUpdatePage.setNameInput('name'),
            supplierUpdatePage.setCompanyInput('company'),
            supplierUpdatePage.setSuppRespInput(absolutePath),
            supplierUpdatePage.loginSelectLastOption(),
            supplierUpdatePage.supplierResponseSelectLastOption()
        ]);
        expect(await supplierUpdatePage.getNameInput()).to.eq('name');
        expect(await supplierUpdatePage.getCompanyInput()).to.eq('company');
        expect(await supplierUpdatePage.getSuppRespInput()).to.endsWith(fileNameToUpload);
        await supplierUpdatePage.save();
        expect(await supplierUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await supplierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Supplier', async () => {
        const nbButtonsBeforeDelete = await supplierComponentsPage.countDeleteButtons();
        await supplierComponentsPage.clickOnLastDeleteButton();

        supplierDeleteDialog = new SupplierDeleteDialog();
        expect(await supplierDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Supplier?');
        await supplierDeleteDialog.clickOnConfirmButton();

        expect(await supplierComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
