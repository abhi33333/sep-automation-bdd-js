import {  Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { paymentPlanPage, page, startApplicationPage, reviewPaymentPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

When('user selects the Upfront payment plan', async function () {
    await paymentPlanPage.selectPaymentPlan('upfront');
});

When('user selects the Installments payment plan', async function () {
    await paymentPlanPage.selectPaymentPlan('installments');
});

Then('the Upfront payment plan should be highlighted', async function () {
    await expect(paymentPlanPage.upfrontPaymentFrame)
        .toHaveAttribute('aria-expanded', 'true');
});

Then('the Installments payment plan should be highlighted', async function () {
    await expect(paymentPlanPage.installmentsPaymentFrame)
        .toHaveAttribute('aria-expanded', 'true');
});

Then('the Upfront payment plan should not be highlighted', async function () {
    await expect(paymentPlanPage.upfrontPaymentFrame)
        .toHaveAttribute('aria-expanded', 'false');
});

Then('the Installments payment plan should not be highlighted', async function () {
    await expect(paymentPlanPage.installmentsPaymentFrame)
        .toHaveAttribute('aria-expanded', 'false');
});

Then('the Next button should be enabled', async function () {
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});

Then('the Next button should remain enabled', async function () {
    await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});