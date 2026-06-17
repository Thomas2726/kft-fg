import { AIModellocator } from '../locator/AIModelLocator';

export class AIModelPage {

    constructor() {
        this.locator = new AIModellocator();
    }

    navigateToAIModel() {
        this.locator.aiModelMenu().click();
    }

    selectModel(modelName = null) {

    this.locator.modelDropdown().click();

    if (modelName) {
        this.locator.modelOption(modelName)
            .should('be.visible')
            .click();
    } else {
        cy.get('[role="option"]').then(($options) => {
            const randomIndex = Math.floor(Math.random() * $options.length);

            cy.wrap($options[randomIndex]).click();
        });
    }
}

    enterCustomerPayload(payload) {
        this.locator.customerPayloadTextArea()
            .should('be.visible')
            .clear()
            .type(payload, {
                parseSpecialCharSequences: false
            });
    }

    clickScoreButton() {
        this.locator.scoreButton().click();
    }

    verifyFraudScore() {

    cy.contains('Fraud score:')
        .invoke('text')
        .then((text) => {

            const rawScore = Number(text.match(/[\d.]+/)[0]);

            let bucket = 0;

            if (rawScore <= 33) bucket = 0;
            else if (rawScore <= 66) bucket = 50;
            else bucket = 100;

            expect(bucket).to.be.oneOf([0, 50, 100]);
        });
}

    verifyRecommendation() {
    cy.contains('p', 'Recommendation:')
        .invoke('text')
        .then((text) => {
            expect(text).to.match(/(BLOCK|REVIEW|ALLOW|APPROVE)/);
        });
}
    verifyReason(reason) {
        this.locator.reasonLabel()
            .should('be.visible')
            .and('contain', reason);
    }
}