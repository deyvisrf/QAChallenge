/// <reference types="cypress" />

describe('Sign Up', () => {
    beforeEach(() => { cy.signup() })

    it('Sign Up of minors under 18 years of age', () => {
      cy.get('#signup-form-input-age').type('17')
      cy.contains('Sua idade deve ser maior que 18 anos').should('be.visible')
      })

    it('Sign Up successfully', () => {
      cy.get('#signup-form-input-age').type('19')
      cy.get('#sign-up-form-input-terms').check()
      cy.get('#signup-form-button-signup').should('be.visible').click()

      cy.contains('CONFIRMAR CELULAR', {timeout: 100000}).should('be.visible')
      cy.get('#confirm-phone-link-validate-later').click()
      })
    })