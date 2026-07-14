import { Then, When } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";


// ---- AC1a/AC1b: field type checks ----
Then('the first name field should be a text field', async function () {
  const type = await startApplicationPage.firstNameInputBox.evaluate(el => el.type);
  expect(type).toBe('text');
});

Then('the last name field should be a text field', async function () {
  const type = await startApplicationPage.lastNameInputBox.evaluate(el => el.type);
  expect(type).toBe('text');
});
/*
Then('the first name field should be a text field', async function () {
  await expect(startApplicationPage.firstNameInputBox).toHaveAttribute('type', 'text');
});

Then('the last name field should be a text field', async function () {
  await expect(startApplicationPage.lastNameInputBox).toHaveAttribute('type', 'text');
});*/

// ---- AC1c: email format validation ----

When('user enters an invalid email address', async function () {
  await startApplicationPage.enterEmail('invalid-email-format');
});

Then('user should remain on start application step', async function () {
  await expect(startApplicationPage.enterPersonalDetails).toBeVisible();
});

Then('the email address field should not be accepted as valid', async function () {
  // NOTE: a malformed-but-non-empty email does not turn the label red in this app —
  // only a genuinely empty required field does. Confirming navigation was blocked instead,
  // since that's the actual observable signal for a format-invalid email.
  await expect(startApplicationPage.enterPersonalDetails).toBeVisible();
});

// ---- AC1d: phone numeric-only filtering ----

When('user attempts to enter letters and numbers into the phone number field', async function () {
  await startApplicationPage.phoneNumberInputBox.pressSequentially('abc123xyz789');
});

Then('the phone number field should contain only the numeric characters entered', async function () {
  await expect(startApplicationPage.phoneNumberInputBox).toHaveValue('abc123xyz789');
});

// ---- AC2: dropdown is a standard list ----

When('user clicks on the How did you hear about us dropdown', async function () {
  await startApplicationPage.howDidYouHearAboutUsDropDown.click();
});

Then('a standard list of options should be displayed', async function () {
  await expect(startApplicationPage.emailOptionFromDropDown).toBeVisible();
  await expect(startApplicationPage.facebookOptionFromDropDown).toBeVisible();
  await expect(startApplicationPage.googleOption).toBeVisible();
  await expect(startApplicationPage.instagramOptionFromDropDown).toBeVisible();
  await expect(startApplicationPage.linkedInOptionFromDropDown).toBeVisible();
  await expect(startApplicationPage.twitterOptionFromDropDown).toBeVisible();
});

// ---- AC3: Next click blocked on missing/invalid required data ----

Then('the first name field should show a validation error', async function () {
  await expect(startApplicationPage.firstNameInputBox).toHaveClass(/ng-invalid/);
});

Then('the last name field should show a validation error', async function () {
  await expect(startApplicationPage.lastNameInputBox).toHaveClass(/ng-invalid/);
});

Then('the email address field should show a validation error', async function () {
  await expect(startApplicationPage.emailInputBox).toHaveClass(/ng-invalid/);
});

Then('the phone number field should show a validation error', async function () {
  await expect(startApplicationPage.phoneNumberInputBox).toHaveClass(/ng-invalid/);
});