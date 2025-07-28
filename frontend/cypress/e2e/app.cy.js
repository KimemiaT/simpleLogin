describe('Login and Todo CRUD', () => {
  it('Login with invalid credentials', () => {
    cy.visit('/');
    cy.get('input').first().type('wrong');
    cy.get('input').eq(1).type('bad');
    cy.contains('Login').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid credentials');
    });
  });

  it('Login with valid credentials', () => {
    cy.visit('/');
    cy.get('input').first().clear().type('admin');
    cy.get('input').eq(1).clear().type('1234');
    cy.contains('Login').click();
    cy.contains('Add');
  });

  it('Create and delete a todo', () => {
    cy.get('input').first().type('My Todo');
    cy.contains('Add').click();
    cy.contains('My Todo');
    cy.contains('Delete').click();
  });
});
