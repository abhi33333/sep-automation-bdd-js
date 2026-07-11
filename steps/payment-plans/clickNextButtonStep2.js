import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage, page, startApplicationPage, reviewPaymentPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

// ---- Background steps ----

Given('user has completed step one with valid information', async function () {
  await startApplicationPage.enterFirstName(productInfo.applicant.firstName);
  await startApplicationPage.enterLastName(productInfo.applicant.lastName);
  await startApplicationPage.enterEmail(`${Date.now()}.${productInfo.applicant.email}`);
  await startApplicationPage.enterPhoneNumber(productInfo.applicant.phoneNumber);
  await startApplicationPage.selectHowDidYouHearAboutUs(productInfo.applicant.howDidYouHear);
  await startApplicationPage.clickNextButton();
});

Given('user is on step two of the enrollment process', async function () {
  await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
});

// ---- sep16-1: disabled by default ----

Then('the next button should be disabled', async function () {
  await expect(paymentPlanPage.activeNextButton).not.toBeVisible();
  await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
});

// ---- Plan selection (shared verb/casing for both plans) ----

When('user clicks the upfront payment plan', async function () {
  await paymentPlanPage.selectPaymentPlan('upfront');
});

When('user clicks the installments payment plan', async function () {
  await paymentPlanPage.selectPaymentPlan('installments');
});

// ---- AC1: Next button enabled after selection ----

Then('the next button should be enabled', async function () {
  await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});

// ---- AC5 (Payment Plan page): price summary per plan ----

Then('the upfront price summary should be displayed on the payment plan page', async function () {
  const upfront = productInfo.prices.find(p => p.type === 'one-time');
  const subtotal = upfront.baseAmount - upfront.upfrontDiscountAmount;

  await expect(paymentPlanPage.basePriceAmountUnderUpfront).toHaveText(`$${upfront.baseAmount}`);
  await expect(paymentPlanPage.upfrontDiscountAmountUnderUpfront).toBeVisible();
  await expect(paymentPlanPage.subtotalAmountUnderUpfront).toHaveText(`$${subtotal}`);
});

Then('the installments price summary should be displayed on the payment plan page', async function () {
  const installments = productInfo.prices.find(p => p.type === 'recurring');
  const pricePerInstallment = installments.baseAmount / installments.numberOfInstallments;

  await expect(paymentPlanPage.basePriceAmountUnderInstallments).toHaveText(`$${installments.baseAmount}`);
  await expect(paymentPlanPage.installmentsNumberUnderInstallments).toHaveText(`${installments.numberOfInstallments}`);
  await expect(paymentPlanPage.pricePerInstallmentsAmountUnderInstallments).toHaveText(`$${pricePerInstallment}`);
});

// ---- Click Next (shared phrase for both plans) ----

When('user clicks the next button on the payment plan page', async function () {
  await paymentPlanPage.clickNextButton();
});

// ---- AC2: Review page displayed ----

Then('the review page should be displayed', async function () {
  await expect(reviewPaymentPage.paymentForm).toBeVisible();
});

// ---- AC3: stepper colors ----

Then('the start application stepper circle should be green', async function () {
  await expect(paymentPlanPage.step1).toHaveCSS('background-color', 'rgb(172, 245, 138)');
});

Then('the payment plan stepper circle should be green', async function () {
  await expect(paymentPlanPage.step2).toHaveCSS('background-color', 'rgb(172, 245, 138)');
});

Then('the review stepper circle should be blue', async function () {
  await expect(paymentPlanPage.step3).toHaveCSS('background-color', 'rgb(1, 201, 255)');
});

// ---- AC4: payment component ----

Then('the payment component should be displayed', async function () {
  await expect(reviewPaymentPage.paymentForm).toBeVisible();
});

// ---- AC5 (Review page): price summary per plan ----

Then('the upfront price summary should be displayed on the review page', async function () {
  const upfront = productInfo.prices.find(p => p.type === 'one-time');
  const subtotal = upfront.baseAmount - upfront.upfrontDiscountAmount;

  await expect(reviewPaymentPage.productPriceAmount).toHaveText(`$${upfront.baseAmount}`);
  await expect(reviewPaymentPage.subtotalAmount).toHaveText(`$${subtotal}`);
  await expect(reviewPaymentPage.processingFeeAmount).toBeVisible();
  await expect(reviewPaymentPage.totalAmount).toBeVisible();
});

Then('the installments price summary should be displayed on the review page', async function () {
  const installments = productInfo.prices.find(p => p.type === 'recurring');
  const pricePerInstallment = installments.baseAmount / installments.numberOfInstallments;

  await expect(reviewPaymentPage.productPriceAmount).toHaveText(`$${installments.baseAmount}`);
  await expect(reviewPaymentPage.installmentPriceAmount).toHaveText(`$${pricePerInstallment}`);
  await expect(reviewPaymentPage.subtotalAmount).toBeVisible();
  await expect(reviewPaymentPage.processingFeeAmount).toBeVisible();
  await expect(reviewPaymentPage.totalAmount).toBeVisible();
});

// ---- AC6: back button ----

Then('the back button should be displayed', async function () {
  await expect(reviewPaymentPage.backButton).toBeVisible();
});

// ---- AC7: pay button ----

Then('the pay button should be displayed', async function () {
  await expect(reviewPaymentPage.payButton).toBeVisible();
});



/*
import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { paymentPlanPage, page, startApplicationPage,reviewPaymentPage  } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Given('user has completed step one with valid information', async function () {
  await startApplicationPage.enterFirstName(productInfo.applicant.firstName);
  await startApplicationPage.enterLastName(productInfo.applicant.lastName);
  await startApplicationPage.enterEmail(`${Date.now()}.${productInfo.applicant.email}`);
  await startApplicationPage.enterPhoneNumber(productInfo.applicant.phoneNumber);
  await startApplicationPage.selectHowDidYouHearAboutUs(productInfo.applicant.howDidYouHear);
  await startApplicationPage.clickNextButton();

});

Given('user is on step two of the enrollment process', async function () {
   await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
});


Then('the next button is disabled by default', async function () {
  await expect(paymentPlanPage.activeNextButton).not.toBeVisible();
  await expect(paymentPlanPage.inactiveNextButton).toBeDisabled();
});

When('user clicks upfront payment option', async function () {
   await paymentPlanPage.selectPaymentPlan('upfront');
});

Then('the next button will be enabled', async function () {
   await expect(paymentPlanPage.activeNextButton).toBeEnabled();
});

When('user clicks installments payment option', async function () {
   await paymentPlanPage.selectPaymentPlan('installments');
});

When('user clicks upfront payment plan', async function () {
   await paymentPlanPage.selectPaymentPlan('upfront');
});

When('user clicks the next button on payment plan step', async function () {
    await paymentPlanPage.clickNextButton();
});

Then('the review step page should be displayed', async function () {
    await expect(reviewPaymentPage.paymentForm).toBeVisible();  

});

When('user clicks Installments payment plan', async function () {
   await paymentPlanPage.selectPaymentPlan('installments');
});

When('user clicks the Next button on payment plan step', async function () {
   await paymentPlanPage.clickNextButton();
});

Then('the Review page should be displayed', async function () { 
     await expect(reviewPaymentPage.paymentForm).toBeVisible(); 

});

Then('the start application stepper circle color should be green', async function () {
        await expect(paymentPlanPage.step1).toHaveCSS('background-color', 'rgb(172, 245, 138)'); // green - filled  
});

Then('the payment plan stepper circle color should be green', async function () {
     await expect(paymentPlanPage.step2).toHaveCSS('background-color', 'rgb(172, 245, 138)'); // green - filled
});

Then('the review stepper circle color should be blue', async function () {
   await expect(paymentPlanPage.step3).toHaveCSS('background-color', 'rgb(1, 201, 255)');   // blue - filled
});

Then('the Start Application stepper circle color should be green', async function () {
  await expect(paymentPlanPage.step1).toHaveCSS('background-color', 'rgb(172, 245, 138)'); // green - filled  
});

Then('the Payment Plan stepper circle color should be green', async function () {
await expect(paymentPlanPage.step2).toHaveCSS('background-color', 'rgb(172, 245, 138)'); // green - filled  
});

Then('the Review stepper circle color should be blue', async function () {
await expect(paymentPlanPage.step3).toHaveCSS('background-color', 'rgb(1, 201, 255)');   // blue - filled
});

Then('the payment component should be displayed', async function () {
  await expect(reviewPaymentPage.paymentForm).toBeVisible();
});
Then('the price summary should be displayed', async function () {
  await expect(reviewPaymentPage.priceSummary).toBeVisible();
});

Then('the back button should be displayed', async function () {
  await expect(reviewPaymentPage.backButton).toBeVisible();
});

Then('the Back button should be displayed', async function () {
  await expect(reviewPaymentPage.backButton).toBeVisible();
});

When('user selects the Upfront payment plan', async function () {
  await paymentPlanPage.selectPaymentPlan('upfront');
});

When('user clicks the Next button on the payment plan step', async function () {
  await paymentPlanPage.clickNextButton();
});

Then('the Pay button should be displayed and disabled', async function () {
  await expect(reviewPaymentPage.payButton).toBeVisible();
  await expect(reviewPaymentPage.payButton).toBeDisabled();
}); */