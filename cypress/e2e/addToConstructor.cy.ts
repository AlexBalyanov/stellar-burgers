describe('Проверка на добавление ингредиента в конструктор', () => {
  beforeEach(() => {
    cy.prepareData();
    cy.visit('/');
  });

  it('Добавление булочки, начинки и соуса в конструктор и проверка, что они там появились', () => {
    cy.get('[data-testid="burger-constructor"]')
      .contains('div', 'Выберите булки')
      .should('exist');

    cy.get('[data-testid="constructor-main-list"]')
      .contains('div', 'Выберите начинку')
      .should('exist');

    cy.get('[data-testid="list-for-Булки"]')
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).contains('button', 'Добавить').click();

        cy.get('[data-testid="burger-constructor"]')
          .contains(name)
          .should('exist');
      });

    cy.get('[data-testid="list-for-Начинки"]')
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).contains('button', 'Добавить').click();

        cy.get('[data-testid="burger-constructor"]')
          .contains(name)
          .should('exist');
      });

    cy.get('[data-testid="list-for-Соусы"]')
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).contains('button', 'Добавить').click();

        cy.get('[data-testid="burger-constructor"]')
          .contains(name)
          .should('exist');
      });
  });
});
