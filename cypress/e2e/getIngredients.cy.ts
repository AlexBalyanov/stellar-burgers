describe('перехват запроса и отображение ингредиентов', () => {
  beforeEach(() => {
    cy.prepareData();
    cy.visit('/');
  });

  it('Проверка отображения полученных ингредиентов', () => {
    cy.get('[data-testid="ingredient"]').should('have.length', 15);
  });
});
