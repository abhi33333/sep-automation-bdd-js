import { Then } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page, leftMainPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then(
  'the "Cydeo Secure Checkout" text should be displayed',
  async function () {
    //await expect(startApplicationPage.cydeoLogo).toBeVisible();
    await expect(startApplicationPage.secureCheckoutText).toBeVisible();
  }
);


Then("the program name should be displayed", async function () {
  await expect(leftMainPage.programName).toBeVisible();
  await expect(leftMainPage.programName).toHaveText(productInfo.programName);
});


Then(
  "the Cydeo logo should be displayed in the left footer",
  async function () {
    await expect(startApplicationPage.footerCydeoLogo).toBeVisible();
  }
);


Then(
  "the Terms and Conditions link should be displayed in the left footer",
  async function () {
    await expect(
      startApplicationPage.termsAndConditionsLink
    ).toBeVisible();
  }
);


Then(
  "the Privacy Policy link should be displayed in the left footer",
  async function () {
    await expect(startApplicationPage.privacyPolicyLink).toBeVisible();
  }
);


Then(
  "the Disclaimer link should be displayed in the left footer",
  async function () {
    await expect(startApplicationPage.disclaimerLink).toBeVisible();
  }
);


Then(
  "the Cookie Policy link should be displayed in the left footer",
  async function () {
    await expect(startApplicationPage.cookiePolicyLink).toBeVisible();
  }
);


Then(
  "the left footer items should be displayed in the following order:",
  async function (dataTable) {
    const expectedOrder = dataTable.raw().flat();

    const footerItems = {
      "Cydeo logo": startApplicationPage.footerCydeoLogo,
      "Terms and Conditions":
        startApplicationPage.termsAndConditionsLink,
      "Privacy Policy": startApplicationPage.privacyPolicyLink,
      "Disclaimer": startApplicationPage.disclaimerLink,
      "Cookie Policy": startApplicationPage.cookiePolicyLink
    };

    const horizontalPositions = [];

    for (const itemName of expectedOrder) {
      const locator = footerItems[itemName];

      if (!locator) {
        throw new Error(`No footer locator found for: ${itemName}`);
      }

      await expect(locator).toBeVisible();

      const boundingBox = await locator.boundingBox();

      if (!boundingBox) {
        throw new Error(
          `Unable to determine the position of: ${itemName}`
        );
      }

      horizontalPositions.push(boundingBox.x);
    }

    for (let index = 1; index < horizontalPositions.length; index++) {
      expect(horizontalPositions[index]).toBeGreaterThan(
        horizontalPositions[index - 1]
      );
    }
  }
);


Then(
    'the right footer should display "Need help? Contact us at enrollment@cydeo.com"',
    async function () {

        await expect(startApplicationPage.footer).toBeVisible();

        await expect(startApplicationPage.footer)
            .toHaveText("Need help? Contact us at enrollment@cydeo.com");
    }
);