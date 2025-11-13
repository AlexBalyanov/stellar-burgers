describe('Проверка сборки бургера, оформление заказа и очистка конструктора при закрытии окна с заказом', () => {
  beforeEach(() => {
    cy.prepareData();
    cy.visit('/');
  });

  it('Сборка бургера, отправка заказа и закрытие окна', () => {
    cy.get('[data-testid="list-for-Булки"]')
      .find('li')
      .first()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-testid="list-for-Начинки"]')
      .find('li')
      .first()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-testid="list-for-Соусы"]')
      .find('li')
      .first()
      .contains('button', 'Добавить')
      .click();

    cy.get('[data-testid="burger-constructor"]')
      .contains('button', 'Оформить заказ')
      .click();

    cy.get('#modals').should('contain.text', '666');
    cy.get('#modals').children().find('button').click();

    cy.get('[data-testid="burger-constructor"]')
      .contains('div', 'Выберите булки')
      .should('exist');

    cy.get('[data-testid="constructor-main-list"]')
      .contains('div', 'Выберите начинку')
      .should('exist');
  });
});
