describe('Проверка работы модального окна', () => {
  beforeEach(() => {
    cy.prepareData();
    cy.visit('/');
  });

  it('Открытие и закрытие модального окна, проверка, что в нем есть содержимое карточки', () => {
    cy.get('[data-testid="list-for-Булки"]')
      .find('li')
      .first()
      .then((element) => {
        const name = element.find('p.text_type_main-default').text();
        cy.wrap(element).find('a').click();

        cy.get('#modals').contains(name).should('exist');
        cy.get('#modals').children().find('button').click();
        cy.get('#modals').children().should('not.exist');
        cy.wrap(element).find('a').click();
        cy.get('[data-testid="modal-overlay"]').click({ force: true });
        cy.get('#modals').children().should('not.exist');
      });
  });
});
