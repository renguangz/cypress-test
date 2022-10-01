it("skips client-side bundle, confirming data from ISR cache", () => {
  // reference: https://glebbahmutov.com/blog/ssr-e2e/#removing-application-bundle
  cy.request("/shows") // page url
    .its("body")
    .then((html) => {
      // remove the scripts, so they don't start automatically
      const staticHTML = html.replace(/<script.*?>.*?<\/script>/gm, "");
      cy.state("document").write(staticHTML);
    });

  cy.findAllByText(/2022 apr 1[456]/i).should("have.length.of", 3);
});
