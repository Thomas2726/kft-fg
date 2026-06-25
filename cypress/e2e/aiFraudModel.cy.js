import { AIModelPage } from '../e2e/pages/actions/AIModelPage';

describe('Fraud Detection using AI Fraud Model', () => {

    const aiModelPage = new AIModelPage();

    before(function () {
        cy.fixture('store').then((data) => {
            this.data = data;
        });
    });
    
    it('Select Customer and Score with AI Model', function () {

        cy.loginCoop();

        aiModelPage.navigateToAIModel();

        cy.url().should('include', '/ai-model');

        // Specific model 
//aiModelPage.selectModel('Ensemble');

// Random model
aiModelPage.selectModel();

        const payload = `{
            "customer_id": "6717c88bd61294bcf18ca44b"
        }`;

        aiModelPage.enterCustomerPayload(payload);

        aiModelPage.clickScoreButton();

        cy.wait(6000);

        aiModelPage.verifyFraudScore();
        aiModelPage.verifyRecommendation('REVIEW');
        aiModelPage.verifyReason('TIN not verified; No TIN provided');
    });
});