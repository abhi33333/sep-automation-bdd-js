import {Then} from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page, leftMainPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then('the product name should be displayed on the information card', async function () {
  await expect(startApplicationPage.programNameOnInfoCard).toHaveText(productInfo.programName);
});

Then('the product name on the information card should match the product name on the left side of the screen', async function () {
  const cardText = await startApplicationPage.programNameOnInfoCard.textContent();
  const sidebarText = await leftMainPage.programName.textContent();
  expect(cardText.trim()).toBe(sidebarText.trim());
});

Then('the product price should be displayed', async function () {
  await expect(startApplicationPage.originalPrice).toBeVisible();
  await expect(startApplicationPage.discountedPrice).toBeVisible();
});

Then('the flexible payment plan text should be displayed', async function () {
  await expect(startApplicationPage.flexiblePaymentsPlanAvailableText).toBeVisible();
});

Then('the program start date should be displayed', async function () {
  await expect(startApplicationPage.programStartDate).toHaveText(productInfo.startDate);
});

Then('the return policy text should be displayed', async function () {
  await expect(startApplicationPage.refundEndDate).toBeVisible();
});

Then('the final return date should be displayed', async function () {
  await expect(startApplicationPage.refundEndDate).toHaveText(productInfo.refundDate);
});