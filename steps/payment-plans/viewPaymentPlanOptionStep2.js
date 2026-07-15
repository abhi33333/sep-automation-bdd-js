import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { paymentPlanPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then("only one Upfront payment plan should be displayed", async function () {
  await expect(paymentPlanPage.upfrontPaymentOption).toHaveCount(1);
});

Then(
  'the first row of the Upfront payment plan should display "Upfront"',
  async function () {
    await expect(paymentPlanPage.upfrontPaymentOption).toHaveText("Upfront");
  }
);

Then(
  'the second row of the Upfront payment plan should display the expected upfront price followed by "pay once"',
  async function () {
    const upfrontPlan = productInfo.prices.find(
      (plan) => plan.active && plan.type.toLowerCase() === "one-time"
    );

    const expectedPrice = upfrontPlan.upfrontDiscount
      ? upfrontPlan.baseAmount - upfrontPlan.upfrontDiscountAmount
      : upfrontPlan.baseAmount;

    await expect(paymentPlanPage.upfrontPaymentAmount).toContainText(
      `$${expectedPrice}`
    );

    await expect(paymentPlanPage.payOnceTextUpFront).toHaveText("pay once");
  }
);

Then(
  "the total number of payment plans should match the expected number",
  async function () {
    const expectedNumberOfPlans = productInfo.prices.filter(
      (plan) => plan.active
    ).length;

    await expect(paymentPlanPage.paymentPlanBoxes).toHaveCount(
      expectedNumberOfPlans
    );
  }
);

Then(
  "the number of installments should match the expected number",
  async function () {
    const installmentPlan = productInfo.prices.find(
      (plan) => plan.active && plan.type.toLowerCase() === "recurring"
    );

    await paymentPlanPage.selectPaymentPlan("installments");

    await expect(
      paymentPlanPage.installmentsNumberUnderInstallments
    ).toHaveText(String(installmentPlan.numberOfInstallments));
  }
);

Then(
  'the first row of the Installments payment plan should display the expected number of installments followed by "Installments"',
  async function () {
    const installmentPlan = productInfo.prices.find(
      (plan) => plan.active && plan.type.toLowerCase() === "recurring"
    );

    await expect(paymentPlanPage.installmentsPaymentFrame).toContainText(
      `${installmentPlan.numberOfInstallments} Installments`
    );
  }
);

Then(
  'the second row of the Installments payment plan should display the expected monthly price followed by "per month"',
  async function () {
    const installmentPlan = productInfo.prices.find(
      (plan) => plan.active && plan.type.toLowerCase() === "recurring"
    );

    const expectedMonthlyPrice =
      installmentPlan.baseAmount / installmentPlan.numberOfInstallments;

    await expect(paymentPlanPage.installmentsPaymentAmount).toContainText(
      `$${expectedMonthlyPrice}`
    );

    await expect(paymentPlanPage.perMonthTextInstallments).toHaveText(
      "per month"
    );
  }
);

Then(
  "all installment payment plans should be unique",
  async function () {
    const installmentPlanTexts =
      await paymentPlanPage.installmentsPaymentFrame.allInnerTexts();

    const uniquePlans = new Set(
      installmentPlanTexts.map((text) => text.trim())
    );

    expect(uniquePlans.size).toBe(installmentPlanTexts.length);
  }
);