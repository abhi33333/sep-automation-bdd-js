import { Then} from "@cucumber/cucumber";
import { expect} from "@playwright/test";
import { paymentPlanPage, page } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

const activePaymentPlans = productInfo.prices.filter(
  price => price.active
);

const upfrontPlans = activePaymentPlans.filter(
  price => price.type.toLowerCase() === "one-time"
);

const installmentPlans = activePaymentPlans.filter(
  price => price.type.toLowerCase() === "recurring"
);

Then(
  "only one Upfront payment plan should be displayed",
  async function () {
    await expect(paymentPlanPage.upfrontPaymentOption).toHaveCount(1);
  }
);


Then(
  'the first row of the Upfront payment plan should display "Upfront"',
  async function () {
    await expect(paymentPlanPage.upfrontPaymentOption).toHaveText("Upfront");
  }
);


Then(
  'the second row of the Upfront payment plan should display the expected upfront price followed by "pay once"',
  async function () {
    const upfrontPlan = upfrontPlans[0];

    if (!upfrontPlan) {
      throw new Error("No active Upfront payment plan was found in qa_data.json");
    }

    const expectedUpfrontPrice = upfrontPlan.upfrontDiscount
      ? upfrontPlan.baseAmount - upfrontPlan.upfrontDiscountAmount
      : upfrontPlan.baseAmount;

    await expect(paymentPlanPage.upfrontPaymentAmount).toContainText(
      `$${expectedUpfrontPrice}`
    );

    await expect(paymentPlanPage.payOnceTextUpFront).toHaveText(
      "pay once"
    );
  }
);


Then(
  "the total number of payment plans should match the expected number",
  async function () {
    const expectedNumberOfPlans = activePaymentPlans.length;

    await expect(paymentPlanPage.paymentPlanBoxes).toHaveCount(
      expectedNumberOfPlans
    );
  }
);


Then(
  "the number of installments should match the expected number",
  async function () {
    for (const installmentPlan of installmentPlans) {
      await paymentPlanPage.selectPaymentPlan("installments");

      await expect(
        paymentPlanPage.installmentsNumberUnderInstallments
      ).toHaveText(String(installmentPlan.numberOfInstallments));
    }
  }
);


Then(
  'the first row of the Installments payment plan should display the expected number of installments followed by "Installments"',
  async function () {
    const installmentPlan = installmentPlans[0];

    if (!installmentPlan) {
      throw new Error(
        "No active Installments payment plan was found in qa_data.json"
      );
    }

    const expectedText =
      `${installmentPlan.numberOfInstallments} Installments`;

    await expect(
      paymentPlanPage.installmentsPaymentFrame
    ).toContainText(expectedText);
  }
);


Then(
  'the second row of the Installments payment plan should display the expected monthly price followed by "per month"',
  async function () {
    const installmentPlan = installmentPlans[0];

    if (!installmentPlan) {
      throw new Error(
        "No active Installments payment plan was found in qa_data.json"
      );
    }

    const expectedMonthlyPrice =
      installmentPlan.baseAmount /
      installmentPlan.numberOfInstallments;

    await expect(
      paymentPlanPage.installmentsPaymentAmount
    ).toContainText(`$${expectedMonthlyPrice}`);

    await expect(
      paymentPlanPage.perMonthTextInstallments
    ).toHaveText("per month");
  }
);


Then(
  "all installment payment plans should be unique",
  async function () {
    const installmentPlanTexts =
      await paymentPlanPage.installmentsPaymentOption.allInnerTexts();

    const normalizedPlanTexts = installmentPlanTexts.map(
      text => text.trim()
    );

    const uniquePlanTexts = new Set(normalizedPlanTexts);

    expect(uniquePlanTexts.size).toBe(normalizedPlanTexts.length);
  }
);