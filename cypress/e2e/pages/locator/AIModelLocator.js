export class AIModellocator {

    aiModelMenu() {
        return cy.get('.space-y-1.p-3')
            .contains('button', 'AI Model');
    }

    modelDropdown() {
        return cy.get('button[role="combobox"]');
    }

    modelOption(modelName) {
        return cy.contains('[role="option"]', modelName);
    }

    customerPayloadTextArea() {
        return cy.get('.pt-0 > .space-y-2 > .flex');
    }

    scoreButton() {
        return cy.get('.gap-3 > .inline-flex')
            .contains('button', 'Score with AI Model');
    }

    fraudScoreLabel() {
        return cy.get('.flex-1 > .text-lg');
    }

    recommendationLabel() {
        return cy.get('.mt-4 > .flex > .flex-1 > :nth-child(2)');
    }

    reasonLabel() {
        return cy.get('.mt-4 > .flex > .flex-1 > :nth-child(3)');
    }
}