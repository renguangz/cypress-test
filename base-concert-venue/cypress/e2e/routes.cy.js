import { generateRandomId } from "../../lib/features/reservations/utils";
import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";

it("displays correct heading when navigating to shows route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /shows/i }).click();
  cy.findByRole("heading", { name: /upcoming shows/i }).should("exist");
});

it("displays correct heading when navigating to bands route", () => {
  cy.visit("/");
  cy.findByRole("button", { name: /bands/i }).click();
  cy.findByRole("heading", { name: /Our illustrious performers/i }).should(
    "exist"
  );
});

it("displays correct band data from dynamic routes", () => {
  cy.task("db:reset").visit("/bands/1");
  cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
});

it("displays error message if no id found in band data", () => {
  cy.task("db:reset").visit("/bands/12345");
  cy.findByRole("heading", { name: /error: band not found/i }).should("exist");
});

it("displays name for band after adding bands", () => {
  const bandId = generateRandomId();
  const newBand = generateNewBand(bandId);
  cy.task("db:reset").task("addBand", newBand).visit(`/bands/${bandId}`);
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");
});
