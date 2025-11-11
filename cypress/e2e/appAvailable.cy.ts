describe('Проверка доступности приложения по адресу: http://localhost:4000/', () => {
  it('Приложение доступно по адресу: http://localhost:4000/', () => {
    cy.visit('http://localhost:4000/');
  });
});
