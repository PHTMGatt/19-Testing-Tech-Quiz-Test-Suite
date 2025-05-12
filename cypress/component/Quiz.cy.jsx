
import Quiz from '../../client/src/components/Quiz';

describe('Testing Quiz Component', () => {

  beforeEach(() => {
    // Reset the local storage before each test
    cy.intercept({
      method: 'GET',
      url: '/api/questions/random', 
    }, {
      fixture: 'questions.json',
      statusCode: 200
    }).as('getQuestions');  
  });
  
  
  it('renders the Quiz component to the Browser and we see a button', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').should('be.visible');
    cy.get('[data-cy="quiz-start"]').should('exist');
    
  });

  it('starts the Quiz', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').contains('What is the capital of France?').should('be.visible');
    
  });

  it('shows our completion component', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Quiz />);
    cy.get('button').contains('Start Quiz').click();
    cy.get('h2').contains('What is the capital of France?').should('be.visible');
    cy.get('button').contains('1').click();
    cy.get('h2').contains('Quiz Completed').should('be.visible');
  });


})