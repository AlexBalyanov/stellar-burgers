import { dataSelectors } from '../support/constants';

describe('Проверка сборки бургера, оформление заказа и очистка конструктора при закрытии окна с заказом', () => {
  beforeEach(() => {
    cy.prepareData();
    cy.visit('/');
  });

  it('Сборка бургера, отправка заказа и закрытие окна', () => {
    cy.get(dataSelectors.bunsList)
      .find('li')
      .first()
      .contains('button', 'Добавить')
      .click();

    cy.get(dataSelectors.mainsList)
      .find('li')
      .first()
      .contains('button', 'Добавить')
      .click();

    cy.get(dataSelectors.saucesList)
      .find('li')
      .first()
      .contains('button', 'Добавить')
      .click();

    cy.get(dataSelectors.burgerConstructor)
      .contains('button', 'Оформить заказ')
      .click();

    cy.get('#modals').should('contain.text', '666');
    cy.get('#modals').children().find('button').click();

    cy.get(dataSelectors.burgerConstructor)
      .contains('div', 'Выберите булки')
      .should('exist');

    cy.get(dataSelectors.constructorMainList)
      .contains('div', 'Выберите начинку')
      .should('exist');
  });
});
