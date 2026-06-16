describe('Fraud Detection using AI Fraud Model', () => {
    
  before(function(){
    cy.fixture('store').then(function(data)
    {
      this.data=data 
    })
  })
  
  it('Select Customer and Score with AI Model', function() {
       
    cy.loginCoop()
    
    /* cy.visit('https://admin.detect.kifiya.dev/')
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
        cy.url().should('include', '/dashboard') */

        //Access AI model page
        cy.get('.space-y-1.p-3')
          .contains('button', 'AI Model')
          .click()

        //Assert the AI Fraud page is accessed
        cy.url().should('include', '/ai-model')

        //Select AI model
        cy.get('button[role="combobox"]')
          .click()
        
        cy.contains('[role="option"]', 'Ensemble')
          .should('be.visible')
          .click()    
          
        //Click on Score applicant Text area and write customer id
        const json = `{
                        "customer_id": "6717c88bd61294bcf18ca44b"
                      }`

        cy.get('.pt-0 > .space-y-2 > .flex')
          .should('be.visible')
          .clear()
          .type(json, { parseSpecialCharSequences: false })

        //Click on Score with AI Model
        cy.get('.gap-3 > .inline-flex')
          .contains('button', 'Score with AI Model')
          .click()

        //Wait, and verify the score
        cy.wait(6000)
        cy.get('.mt-4 > .flex')
          .should('be.visible')
          .get('.flex-1 > .text-lg')
          .contains('Fraud score: ').should('contain','50')

        // Recommendation check
        cy.get('.mt-4 > .flex > .flex-1 > :nth-child(2)')
          .should('be.visible')
          .contains('Recommendation:').should('contain', 'REVIEW')

        //Reason check
        cy.get('.mt-4 > .flex > .flex-1 > :nth-child(3)')
          .should('be.visible')
          .contains('Reasons: ')
          .should('contain', 'TIN not verified; No TIN provided')

    })

    
})