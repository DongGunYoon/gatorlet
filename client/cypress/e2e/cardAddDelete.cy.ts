describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://memorly.kro.kr/')
    cy.contains('Log in').click()

    cy.get("#mat-input-0").type("test1234@gmail.com")

    cy.get("#mat-input-1").type("123456")

    cy.get('button').first().click()
    cy.contains('Folder Library')
    cy.contains('Cypress Testing (Add/Remove)')

    cy.get('button').eq(16).click({force: true})

    cy.get("#mat-input-0").type("new card front")
    cy.get("#mat-input-1").type("new card back")
    cy.contains('Create cards').click()

    cy.contains('new card front')
    cy.contains('Flip').click()
    cy.contains('new card back')

    cy.contains('Delete').click()
    cy.contains('Delete card').click()

    cy.contains('Logout').click()
  })
})