/// <reference types="cypress" />

describe('Sign In', () => {
    beforeEach(() => { 
      cy.signin()
    })

    it('Sign in successfully ', () => {
      cy.get('.css-162x1q9-textBase-UserProfileCard').should('be.visible').click()
      cy.contains('Andreza Saraiva').should('be.visible')
      })

    it('Sign in and add item on Cart', () => {
      cy.empty_cart()
      cy.contains('Brahma Duplo Malte 350ml').click()
      cy.get('#add-product', {timeout: 90000}).click()
      cy.contains('Suas bebidas já vão geladinhas!').should('be.visible')
    })
})