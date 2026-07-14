import { Given, Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { reviewPaymentPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


When('user enters {string} card number', async function (string) {
    await reviewPaymentPage.enterCardNumber(string);
});

When('user clicks the terms and conditions checkbox', async function () {
    await reviewPaymentPage.clickTermsAndConditionsCheckbox();
});

Then('user should see the error message {string}', async function (string) {
    await expect(reviewPaymentPage.cardNumberErrorMessage).toHaveText(string);
});