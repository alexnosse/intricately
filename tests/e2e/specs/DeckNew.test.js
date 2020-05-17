// https://docs.cypress.io/api/introduction/api.html

describe('Go to /, but get redirected to /deck/new', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.wait(400);
    cy.url().should('include', 'deck/new');
  });
});

describe('Go to /deck/new, check elements on page', () => {
  it('Checks all input types', () => {
    cy.visit('/deck/new');
    cy.get('input[type="text"]').should('have.length', 11);
  });
});

describe('Go to /deck/new, submitting with a valid data', () => {
  it('Should be sent to /deck/:deck_id', () => {
    cy.visit('/deck/new');
    cy.get('#input_1').type('AH');
    cy.get('#rotationCard').type('2H');
    cy.get('button').click();
    cy.wait(1000);
    cy.get('.home > .header').contains('ORDERED PILE');
  });
});

describe('Go to /deck/new, submitting with a blank data', () => {
  it('should show some warnings and should stay at the same route', () => {
    cy.visit('/deck/new');
    cy.get('.error').should('not.exist');
    cy.get('button').click();
    cy.wait(300);
    cy.get('.error').its('length').should('gt', 0);
    cy.url().should('include', 'deck/new');
  });
});

describe('Go to /deck/new, not submitting rotation card', () => {
  it('should show some warnings and should stay at the same route', () => {
    cy.visit('/deck/new');
    cy.get('.error').should('not.exist');
    cy.get('#input_1').type('AH');
    cy.get('#input_2').type('KS');
    cy.get('button').click();
    cy.wait(300);
    cy.get('.error').its('length').should('gt', 0);
    cy.url().should('include', 'deck/new');
  });
});

describe('Go to /deck/new, submitting with a invalid data', () => {
  it('should show some warnings and should stay at the same route', () => {
    cy.visit('/deck/new');
    cy.get('#input_1').type('hi');
    cy.get('#rotationCard').type('no');
    cy.get('.error').should('not.exist');
    cy.get('button').click();
    cy.wait(300);
    cy.get('.error').its('length').should('gt', 0);
    cy.url().should('include', 'deck/new');
  });
});

describe('Go to /deck/new, submitting with a duplicated cards', () => {
  it('[duplicated cards] should show some warnings and should stay at the same route', () => {
    cy.visit('/deck/new');
    cy.get('#input_1').type('2H');
    cy.get('#input_2').type('2H');
    cy.get('#rotationCard').type('2S');
    cy.get('.error').should('not.exist');
    cy.get('button').click();
    cy.wait(300);
    cy.get('.error').its('length').should('gt', 0);
    cy.url().should('include', 'deck/new');
  });
  it('[card are the same as rotation card] should show some warnings and should stay at the same route', () => {
    cy.visit('/deck/new');
    cy.get('#input_1').type('2H');
    cy.get('#input_2').type('2S');
    cy.get('#rotationCard').type('2S');
    cy.get('.error').should('not.exist');
    cy.get('button').click();
    cy.wait(300);
    cy.get('.error').its('length').should('gt', 0);
    cy.url().should('include', 'deck/new');
  });
});
