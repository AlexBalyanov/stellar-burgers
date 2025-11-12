import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      prepareData(): void;
    }
  }
}
