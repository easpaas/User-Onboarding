import { object } from "prop-types"

//arrange
describe('Tests all form inputs', function () {
  beforeEach(function () {
    cy.visit('localhost:3000')
  })
    it('Validate first name input', function() {
      cy.get('[for="name"] > input')
        .type('Fox Mulder')
        .should('have.value', 'Fox Mulder')
        .clear()
      // cy.get()

    })
    it('Successfully submit form', function() {
      // first name input
      cy.get('[for="name"] > input')
        .type('Fox Mulder')
        .should('have.value', 'Fox Mulder')

      // email input
      cy.get('[for="email"] > input')
        .type('mulder@xfiles.com')
        .should('have.value', 'mulder@xfiles.com')

      // password input
      cy.get('[for="password"] > input')
        .type('password')
        .should('have.value', 'password')

      // checkbox
      cy.get('[for="terms"] > input')
        .check()

      // submit form
      cy.get('button')
        .click()
        .should('return', object)
        
      // successful submit
      cy.get('pre')
        .should('be.a', object)
    })
  })