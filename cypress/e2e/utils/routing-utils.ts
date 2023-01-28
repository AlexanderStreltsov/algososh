const checkOpenPage = (href: string, title: string) => {
  cy.get(`a[href="${href}"]`).click();
  cy.get("h3").invoke("text").should("eq", title);
};

export { checkOpenPage };
