import { Then } from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { startApplicationPage, page, paymentPlanPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then('the stepper should display {string} as step {int}', async function (label, stepNumber) {
  const labels = {
    1: startApplicationPage.startApplicationText,
    2: startApplicationPage.paymentPlanText,
    3: startApplicationPage.reviewText,
  };
  const circles = {
    1: startApplicationPage.startApplicationStepCircle,
    2: startApplicationPage.paymentPlanStepCircle,
    3: startApplicationPage.reviewStepCircle,
  };

  await expect(labels[stepNumber]).toHaveText(label);
  await expect(circles[stepNumber]).toHaveText(String(stepNumber));
});

Then('the start application stepper circle should be blue', async function () {
  await expect(paymentPlanPage.step1).toHaveCSS('background-color', 'rgb(1, 201, 255)');
});

Then('the payment plan stepper circle should be grey', async function () {
  await expect(paymentPlanPage.step2).toHaveCSS('border-color', 'rgb(217, 226, 236)');
});

Then('the review stepper circle should be grey', async function () {
  await expect(paymentPlanPage.step3).toHaveCSS('border-color', 'rgb(217, 226, 236)');
});