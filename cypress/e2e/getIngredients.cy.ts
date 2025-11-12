describe('перехват запроса и отображение ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('get', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');
  });

  it('Проверка отображения полученных ингредиентов', () => {
    cy.visit('/');
    cy.wait('@ingredients');

    cy.get('[data-testid="ingredient"]').should('have.length', 15);
  });
});
