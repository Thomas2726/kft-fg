describe('Login to fraud guard', () => {

  before(function () {
        cy.fixture('store').then((data) => {
            this.data = data;
        });
  });

 
  it('Access and login to fraud guard', () => {
    cy.loginCoop();

  })

})

describe('Evaluate a customer', () => {

  before(function () {
        cy.fixture('store').then((data) => {
            this.data = data;
        });
  });

  it('Check if there are available providers', () => {
    cy.loginCoop();
    
    //Click on Providers tab
    cy.get('[href="/providers"] > .inline-flex > .text-sm').click()
    cy.url().should('include', '/providers')
    
    cy.wait(4000)
    //cy.get('.lg\:grid-cols-3').should('have.length', 2)
    cy.get('div h3.tracking-tight.text-lg.font-semibold.pr-4') //locate availalbe providers
    
    //Assert the number of listed providers
    cy.get('div h3.tracking-tight.text-lg.font-semibold.pr-4').should('have.length', 3) 

    //Assert the providers are Enabled
    cy.get(':nth-child(1) > .flex-col > .flex-wrap > :nth-child(2) > :nth-child(2)')
    
  })

  it('Check if there are available rules', () => {
    cy.loginCoop(); 
    
    //Click on Providers tab
    cy.get('[href="/rules"] > .inline-flex > .text-sm').click()
    cy.url().should('include', '/rules')
    
    cy.wait(4000)
    //cy.get('.lg\:grid-cols-3').should('have.length', 2)
    cy.get('.mt-4.text-sm.text-muted-foreground') //locate availalbe rules
    
    //Assert the number of listed providers
    //cy.get('.mt-4.text-sm.text-muted-foreground').should('have.value', '') 

    //Assert the providers are Enabled
    //cy.get(':nth-child(1) > .flex-col > .flex-wrap > :nth-child(2) > :nth-child(2)')
    
  })

  it('Evaluate a blocked customer based on a published rule', () => {
    cy.loginCoop();

    //Access Evaluage page  
    cy.get('[href="/evaluate"] > .inline-flex').click()
    cy.url().should('include', '/evaluate')

    // Open dropdown
    cy.get('button[role="combobox"]')
      .should('be.visible')
      .click()

    // Choose option
    cy.contains('[role="option"]', 'Check Blacklisted Customer', { timeout: 10000 })
      .click()

    // Verify
    cy.get('button[role="combobox"]')
      .should('contain', 'Check Blacklisted Customer')

    cy.wait(2000)

    const json = `{
      "customer_number": "1010102694"
    }`

    cy.get('textarea')
      .should('be.visible')
      .clear()
      .type(json, { parseSpecialCharSequences: false })

    //Click on Evaluate Rule button
    cy.get('.pt-0 > .inline-flex').click()

    cy.wait(1500)
    
        // Score check
    cy.get('.pt-0 > :nth-child(1) > .gap-3').contains('Score:').should('contain', '100')

    // Decision check
    cy.get('.pt-0 > :nth-child(1) > .gap-3').contains('Decision:').should('contain', 'block')

    // Alert ID validation
    cy.get('.pt-0 > :nth-child(1) > .gap-3').contains('Alert ID:')
      .invoke('text')
      .then(text => {
        const alertId = text.split(':')[1].trim()
        expect(alertId).to.match(/^[0-9a-f-]{36}$/i)
      })

    // Case ID validation
    cy.get('.pt-0 > :nth-child(1) > .gap-3').contains('Case ID:')
      .invoke('text')
      .then(text => {
        const caseId = text.split(':')[1].trim()
        expect(caseId).to.match(/^[0-9a-f-]{36}$/i)
      })
  })

  it('Evaluate a safe customer based on a published rule', () => {
    cy.loginCoop();

    //Access Evaluage page  
    cy.get('[href="/evaluate"] > .inline-flex').click()
    cy.url().should('include', '/evaluate')

    // Open dropdown
    cy.get('button[role="combobox"]')
      .should('be.visible')
      .click()

    // Choose option
    cy.contains('[role="option"]', 'Check Blacklisted Customer', { timeout: 10000 })
      .click()

    // Verify
    cy.get('button[role="combobox"]')
      .should('contain', 'Check Blacklisted Customer')

    cy.wait(2000)

    const json = `{
      "customer_number": "1010102627"
    }`

    cy.get('textarea')
      .should('be.visible')
      .clear()
      .type(json, { parseSpecialCharSequences: false })

    //Click on Evaluate Rule button
    cy.get('.pt-0 > .inline-flex').click()

    cy.wait(1500)
    
        // Score check
    cy.get('.pt-0 > :nth-child(1) > .gap-3').contains('Score:').should('contain', '0')

    // Decision check
    cy.get('.pt-0 > :nth-child(1) > .gap-3').contains('Decision:').should('contain', 'allow')
    
  })


})