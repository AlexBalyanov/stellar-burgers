import { dataSelectors } from '../support/constants';

describe('Проверка на добавление ингредиента в конструктор', () => {
  beforeEach(() => {
    cy.prepareData();
    cy.visit('/');
  });

  it('Добавление булочки, начинки и соуса в конструктор и проверка, что они там появились', () => {
    cy.get(dataSelectors.burgerConstructor)
      .contains('div', 'Выберите булки')
      .should('exist');

    cy.get(dataSelectors.constructorMainList)
      .contains('div', 'Выберите начинку')
      .should('exist');

    cy.get(dataSelectors.bunsList)
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).contains('button', 'Добавить').click();

        cy.get(dataSelectors.burgerConstructor).contains(name).should('exist');
      });

    cy.get(dataSelectors.mainsList)
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).contains('button', 'Добавить').click();

        cy.get(dataSelectors.burgerConstructor).contains(name).should('exist');
      });

    cy.get(dataSelectors.saucesList)
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).contains('button', 'Добавить').click();

        cy.get(dataSelectors.burgerConstructor).contains(name).should('exist');
      });
  });
});
