// https://docs.cypress.io/api/introduction/api.html
describe('Go to /deck/new, submit a valid deck and a valid rotation card', () => {
  it('should show the loading ', () => {
    cy.visit('/deck/new');
    cy.get('.error').should('not.exist');

    cy.get('#input_1').type('2S');
    cy.get('#input_2').type('2D');
    cy.get('#input_3').type('2C');
    cy.get('#input_4').type('3D');
    cy.get('#input_5').type('3H');
    cy.get('#input_6').type('3C');
    cy.get('#input_7').type('7C');
    cy.get('#input_8').type('KS');
    cy.get('#input_9').type('10S');
    cy.get('#input_10').type('9S');

    cy.get('#rotationCard').type('6S');

    cy.get('button').click();
    cy.wait(500);
    cy.get('.home > .header').contains('ORDERED PILE');
    cy.get('li').its('length').should('eq', 6);
    cy.get('.card').its('length').should('eq', 10);
    cy.url().should('not', 'deck/new');
  });
});
