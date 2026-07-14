import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { paymentPlanPage, page, startApplicationPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


Then('the next button is disabled by deault', async function () {
    await expect(paymentPlanPage.inactiveNextButton).toBeVisible
    await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
});

When('user selects the {string} payment plan', async function (string) {
    await paymentPlanPage.selectPaymentPlan(string);
});


Then('the next button is enabled', async function () {
    await expect(paymentPlanPage.activeNextButton).toBeVisible();
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});


When('user clicks on the next button', async function () {
    await paymentPlanPage.clickNextButton();
});

Then('the review step stepper circle is blue', async function () {
    await expect(startApplicationPage.reviewStepCircle).toHaveCSS('background-color', 'rgb(1, 201, 255)'); 
});

Then('the payment plan stepper circle is green', async function () {
    await expect(startApplicationPage.paymentPlanStepCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)'); 
});

Then('the start application stepper circle is green', async function () {
    await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)'); 
});

Then('the upfront payment summary is displayed', async function () {
    await expect(paymentPlanPage.basePriceAmountUnderUpfront).toBeVisible();
    await expect(paymentPlanPage.upfrontDiscountAmountUnderUpfront).toBeVisible();
    await expect(paymentPlanPage.subtotalAmountUnderUpfront).toBeVisible();
});

Then('the installment payment summary is displayed', async function () {
    await expect(paymentPlanPage.basePriceAmountUnderInstallments).toBeVisible();
    await expect(paymentPlanPage.installmentsNumberUnderInstallments).toBeVisible();
    await expect(paymentPlanPage.pricePerInstallmentsAmountUnderInstallments).toBeVisible();
    await expect(paymentPlanPage.firstMonthPaymentAmountUnderInstallments).toBeVisible();
});

Then('the back button is displayed and enabled', async function () {
    await expect(paymentPlanPage.backButton).toBeVisible();
    await expect(paymentPlanPage.backButton).toBeEnabled();
});