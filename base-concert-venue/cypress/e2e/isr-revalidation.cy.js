import { generateNewBand } from "../../__tests__/__mocks__/fakeData/newBand";
import { generateNewShow } from "../../__tests__/__mocks__/fakeData/newShow";
import { generateRandomId } from "../../lib/features/reservations/utils";

it("should load refreshed page from cache after new band is added", () => {
  // 1. check that new band is not on the page
  cy.task("db:reset").visit("/bands");
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should(
    "not.exist"
  );

  // 2. add new band via post request to api
  const bandId = generateRandomId();
  const band = generateNewBand(bandId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/bands?secret=${secret}`, { newBand: band }).then(
    (res) => {
      expect(res.body.revalidated).to.equal(true);
    }
  );

  // 3. reload page; new band should appear
  cy.reload();
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");

  // reset ISR cache to initial db conditions
  cy.resetDbAndIsrCache();
});

it("should load refreshed page from cache after new show is added", () => {
  cy.task("db:reset").visit("/shows");
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should(
    "not.exist"
  );

  const showId = generateRandomId();
  const show = generateNewShow(showId);
  const secret = Cypress.env("REVALIDATION_SECRET");

  cy.request("POST", `/api/shows?secret=${secret}`, { newShow: show }).then(
    (res) => {
      expect(res.body.revalidated).to.equal(true);
    }
  );

  cy.reload();
  cy.findByRole("heading", { name: /Avalanche of Cheese/i }).should("exist");

  cy.resetDbAndIsrCache();
});
