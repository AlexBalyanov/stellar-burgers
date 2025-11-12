describe('перехват запроса и отображение ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('get', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('get', '**/auth/user', { fixture: 'user.json' });
    cy.intercept('get', '**/api/orders/all', { fixture: 'feed.json' });
    cy.intercept('get', '**/api/orders', { fixture: 'feed.json' });
  });

  it('Проверка отображения полученных ингредиентов', () => {
    cy.visit('/');
    cy.wait('@ingredients');

    cy.get('[data-testid="ingredient"]').should('have.length', 15);
  });
});
