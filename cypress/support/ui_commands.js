const faker = require('faker-br');

Cypress.Commands.add('signin', () => {
    cy.visit('/')

    cy.get('#onetrust-accept-btn-handler', {timeout: 100000}).click()
    
    cy.get('#login-mail-input-email').type(Cypress.env('user_name'))
    cy.get('#login-mail-input-password').type(Cypress.env('user_password'))
    cy.get('#login-mail-button-sign-in').click()
    cy.get('.css-162x1q9-textBase-UserProfileCard', {timeout: 70000}).should('be.visible')
  })

Cypress.Commands.add('signup', () => {
    cy.visit('/')

    const signup = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: '@@Q1Ze2021',
        cpf: faker.br.cpf(),
        phone: faker.phone.phoneNumber()
      }

      cy.get('#onetrust-accept-btn-handler', {timeout: 100000}).click()
      cy.get('#create-account-link').click()

      cy.get('#signup-form-input-name').type(signup.name)
      cy.get('#signup-form-input-email').type(signup.email)
      cy.get('#signup-form-input-password').type(signup.password)
      cy.get('#signup-form-input-document').type(signup.cpf)
      cy.get('#signup-form-input-phone').type(signup.phone)
  })

  Cypress.Commands.add('empty_cart', () => {
      cy.get('#bag-pre-checkout > .css-1fay8q7 > .css-0').click()
      
      cy.get('body').then((body) => {
      if (body.find('Você não possui nenhum produto na sua sacola').length > 0) {
        cy.get('#sidebar-header-close-button').click()
    } else {
        cy.get('#product-delete-button').click()
        cy.get('#primary-modal-button').click()
        cy.contains('Você não possui nenhum produto na sua sacola').should('be.visible')
        cy.get('#sidebar-header-close-button').click()
      }
    })
  })