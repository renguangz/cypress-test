it("skips client-side bundle, confirming data from ISR cache", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/bands") // page url
    .its("body")
    .then((html) => {
      // remove the scripts, so they don't start automatically
      const staticHTML = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHTML);
    });

  cy.findByRole("heading", { name: /The Wandering Bunnies/i }).should("exist");
  cy.findByRole("heading", { name: /Shamrock Pete/i }).should("exist");
  cy.findByRole("heading", { name: /The Joyous Nun Riot/i }).should("exist");
});
