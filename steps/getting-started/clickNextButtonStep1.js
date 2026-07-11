import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage, page, startApplicationPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

When('user enters the first name', async function () {
  await startApplicationPage.enterFirstName(productInfo.applicant.firstName);
});

When('user enters the last name', async function () {
  await startApplicationPage.enterLastName(productInfo.applicant.lastName);
});

When('user enters the email address', async function () {
  await startApplicationPage.enterEmail(`${Date.now()}.${productInfo.applicant.email}`);
});

When('user enters phone number', async function () {
  await startApplicationPage.enterPhoneNumber(productInfo.applicant.phoneNumber);
});

When('user selects from How did you hear about us dropdown', async function () {
  await startApplicationPage.selectHowDidYouHearAboutUs(productInfo.applicant.howDidYouHear);
});

When('user clicks the next button on start application step', async function () {
  await startApplicationPage.clickNextButton();
});

Then('user should be navigated to payment plan step', async function () {
  await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
});

Then('the payment plan stepper circle should be blue', async function () {
  await expect(paymentPlanPage.step2).toHaveCSS('background-color', 'rgb(1, 201, 255)');
});