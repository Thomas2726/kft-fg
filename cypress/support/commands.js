// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('loginCoop', function() {
    cy.visit('https://admin.detect.kifiya.dev/')
    cy.get('#login-username').type(this.data.email)
    cy.get('#login-password').type(this.data.password)
        
    cy.get('#login-tenant').as('TenantSelector') //Aliasing the tenant selection
    cy.get('@TenantSelector').select(this.data.tenant) //Select Coop tenant

    //Assertion
    cy.get('@TenantSelector')
      .select(this.data.tenant)
      .should('have.value', 'COOP')

    //Click Login and Assert
    cy.get('.inline-flex').click()
    cy.url().should('include', '/dashboard')

})

Cypress.Commands.add('login', () => {
  cy.session('user-session', () => {

    cy.visit('/login');

    cy.get('#login-username')
      .type(this.data.email);

    cy.get('#login-password')
      .type(this.data.password);

    cy.get('#login-tenant').as('TenantSelector') //Aliasing the tenant selection
    cy.get('@TenantSelector')
      .select(this.data.tenant) //Select Coop tenant

    //Assertion
    cy.get('@TenantSelector')
      .select(this.data.tenant)
      .should('have.value', 'COOP')

    //Click Login and Assert
    cy.get('.inline-flex')
      .click();
    cy.url().should('include', '/dashboard')
  });
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })