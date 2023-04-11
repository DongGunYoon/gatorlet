//npx cypress open


describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://memorly.kro.kr/')
    cy.contains('Log in').click()

    cy.get("#mat-input-0").type("test1234@gmail.com")

    cy.get("#mat-input-1").type("123456")

    cy.get('button').first().click()
    cy.contains('Folder Library')
    cy.contains('Chem')

    cy.get('button').eq(1).click({force: true})

    cy.contains('Chem')

    cy.contains('test front')
    cy.contains('->').click()

    cy.contains('front123')
    cy.contains('Flip').click()
    cy.contains('back123')
    cy.contains('Logout').click()

  })
})
