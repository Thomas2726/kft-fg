describe('Tests on Cases Page', () => {
    before(function(){
        cy.fixture('store').then(function(data)
        {
          this.data=data 
        })
    })

    beforeEach(() => {
      cy.login();
    });

    it('Access Cases Page', () => {
        cy.loginCoop(); 
        
        //Click Cases tab
        cy.wait(1000)
        cy.get('[href="/cases"] > .inline-flex').click()

        //Assert Cases page is accessed using url
        cy.url().should('include', '/cases')

        //Check if there are cases
        cy.get(':nth-child(1) > .relative')
          .should('be.visible')
          .and('contain', '19')

        cy.get('.p-0 > .justify-between > :nth-child(2)')
          .contains('Showing ')
          .should('contain', '1 - 19 of 19 entries')
  })

  it('Resolve a case with True Positive disposition', () => {
        ccy.loginCoop()
        
        //Click Cases tab
        cy.wait(1000)
        cy.get('[href="/cases"] > .inline-flex').click()

        //Assert Cases page is accessed using url
        cy.url().should('include', '/cases')
        cy.wait(2000)

        //Filter assigned alerts
            
        cy.contains('label', 'Status')
        .parent()
        .find('button[role="combobox"]')
        .click()
        
        cy.contains('[role="option"]', 'Investigating')
        .should('be.visible')
        .click()

        //View details of an assigned alert
        cy.get('tr td:nth-child(7)').each(($el, index) => {

            const viewDetails = $el.text().trim()

            if (viewDetails.includes('Jan 27, 2026, 3:46 PM EAT')) {

                // Move to the "Action" cell in the SAME row
                cy.get('tr td:nth-child(7)')
                .eq(index)
                .next()
                .should('be.visible')
                .click()

                //Click on View details button
                cy.get('div[role="menuitem"]')
                  .contains('View details')
                  .should('be.visible')
                  .click()

                //Assert to check detail page of the case is accessed
                cy.wait(1500)
                cy.get('.p-8')
                  .should('contain', 'Primary details for this investigation.')
            }     
        })

        //Resolve a case with true positive disposition
        //Click on Resolve button
        cy.get('.flex-wrap > :nth-child(4)')
          .click()

        //Click on Resolve button
        //cy.contains('button', 'Assign').click()

        cy.wait(1000)
        
        // Open dropdown
        cy.get('.space-y-4 > :nth-child(1) > .flex')
        .should('be.visible')
        .click()

        // Choose option

        // Wait for menu
        cy.get('[role="listbox"]').should('be.visible')

        // Choose option
        cy.contains('[role="option"]', 'True Positive').click()

        //Write Fraud Amount
        cy.get('input[type="number"]')
          .should('be.visible')
          .clear()
          .type('3000')

        //Click Resolve button on the dialog box
        cy.get('div[role="dialog"]')
        .contains('button', 'Resolve')
        .click()

        //Assert the alert is assigned to Coop Analyst
        cy.get(':nth-child(5) > .mt-1')
        .should('contain', '3000')
  })

  it.only('Close a resolved case', () => {
        cy.visit('https://fraud-detection.development.kifiya.dev/')
        cy.get('#login-username').type('coopadmin')
        cy.get('#login-password').type('coopadmin_123')
        
        cy.get('#login-tenant').as('TenantSelector') //Aliasing the tenant selection
        cy.get('@TenantSelector').select('COOP') //Select Coop tenant

        //Assert the selection is coop
        cy.get('@TenantSelector')
          .select('COOP')
          .should('have.value', 'COOP')

        //Click Login and Assert
        cy.get('.inline-flex').click()
        cy.wait(5000)
        cy.url().should('include', '/dashboard')
        
        //Click Cases tab
        cy.wait(1000)
        cy.get('[href="/cases"] > .inline-flex').click()

        //Assert Cases page is accessed using url
        cy.url().should('include', '/cases')
        cy.wait(2000)

        //Filter assigned cases
            
        cy.contains('label', 'Status')
          .parent()
          .find('button[role="combobox"]')
          .click()
        
        cy.contains('[role="option"]', 'Resolved')
          .should('be.visible')
          .click()

        //View details of an assigned alert
        cy.get('tr td:nth-child(7)').each(($el, index) => {

            const viewDetails = $el.text().trim()

            if (viewDetails.includes('Jan 27, 2026, 3:43 PM EAT')) {

                // Move to the "Action" cell in the SAME row
                cy.get('tr td:nth-child(7)')
                .eq(index)
                .next()
                .should('be.visible')
                .click()

                //Click on View details button
                cy.get('div[role="menuitem"]')
                  .contains('View details')
                  .should('be.visible')
                  .click()

                //Assert to check detail page of the case is accessed
                cy.wait(1500)
                cy.get('.p-8')
                  .should('contain', 'Primary details for this investigation.')
            }     
        })

        //Click on Close button
        cy.get('.flex.flex-wrap.gap-2')
          .contains('button', 'Close case')
          .click()
        
        cy.wait(1000)
        
        //Assert the case is closed
        //Filter closed cases
            
        cy.contains('label', 'Status')
        .parent()
        .find('button[role="combobox"]')
        .click()
        
        cy.contains('[role="option"]', 'Closed')
        .should('be.visible')
        .click()

        cy.get('tr td:nth-child(1)').each(($el, index, $list) => {
    
          const text = $el.text()
          if(text.includes('CASE-20260127124327'))
          {
            cy.get('tr td:nth-child(1)').eq(index).then(function(status){
              const statusText = status.text()
              expect(statusText).to.be.equal('CASE-20260127124327fraud detection')
            })
          }
        
        })
        
  })
    
})