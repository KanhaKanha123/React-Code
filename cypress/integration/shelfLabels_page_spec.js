describe('The Shelf Labels Link', () => {
  beforeEach(() => {
    cy.fixture('config.json').as('config')
    cy.server()

    cy.route({
      method: 'POST',
      url: '/',
      response: []
    })

    cy.visit('/', {})
  })

  it('successfully loads', () => {
    cy.url().should('include', '/order')
  })
  describe('find right side block on click left side links', () => {
    it('click Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      cy.get('.grommetux-box > header > div > span').contains('Shelf Labels')
    })
  })
  describe('Click on search button and open popup', () => {
    it('click on search for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy.wait(1000)

      //after search finding for quantity popup
      cy.get('form > div > header > h1').contains('Set Quantity')
    })
  })
  describe('Click on Update button to add record', () => {
    it('click on update for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy
        .get('footer > a')
        .contains('Update')
        .click()

      cy.get('ul > li > div').contains('U-GYD-VJK-DEO-1')

      cy.get('li > div > div > button').click()

      cy
        .get('nav > a')
        .contains('Delete Item')
        .click()

      cy
        .get('footer > a')
        .contains('Confirm')
        .click()

      cy.wait(1000)
    })
  })

  describe('Click on delete for deleting records', () => {
    it('click on delete for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy.get('.grommetux-form-field__contents > input').type('1')

      cy
        .get('footer > a')
        .contains('Update')
        .click()

      cy.get('li > div > div > button').click()

      cy
        .get('nav > a')
        .contains('Delete Item')
        .click()

      cy
        .get('footer > a')
        .contains('Confirm')
        .click()

      cy
        .get('ul > div > span')
        .contains('Nothing to process - Add some items to get started.')

      cy.wait(1000)
    })
  })
  describe('Click on Cancel button', () => {
    it('click on cancel for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy
        .get('footer > a')
        .contains('Cancel')
        .click()

      cy
        .get('ul > div > span')
        .contains('Nothing to process - Add some items to get started.')
    })
  })
  describe('Click on search button to add record. Check for duplicate', () => {
    it('click on update for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy
        .get('footer > a')
        .contains('Update')
        .click()

      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy
        .get('.grommetux-layer__container > h2')
        .contains('There is already an entry for this product.')

      cy
        .get('footer > a')
        .contains('Cancel')
        .click()

      cy.get('li > div > div > button').click()
      cy
        .get('nav > a')
        .contains('Delete Item')
        .click()

      cy
        .get('footer > a')
        .contains('Confirm')
        .click()

      cy.wait(1000)
    })
  })
  describe('Click on Send button', () => {
    it('click on send for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy
        .get('footer > a')
        .contains('Update')
        .click()

      cy
        .get('button')
        .contains('Send')
        .click()

      cy.wait(3000)

      cy
        .get('ul > div > span')
        .contains('Nothing to process - Add some items to get started.')
    })
  })
  describe('Click on change quantity', () => {
    it('click on change quantity for Shelf Labels', () => {
      cy
        .get('.grommetux-anchor')
        .contains('Shelf Labels')
        .click()

      //input value for barcode
      cy.get('#barcodeInputContainer > input').type('1')

      //click on search button
      cy
        .get('button')
        .contains('Search')
        .click()

      cy
        .get('footer > a')
        .contains('Update')
        .click()

      cy.get('li > div > div > button').click()

      cy
        .get('nav > a')
        .contains('Change Quantity')
        .click()

      cy.get('.grommetux-form-field__contents > input').type('2')

      cy.wait(1000)

      cy
        .get('footer > a')
        .contains('Update')
        .click()

      cy.get('li > div:nth-child(2) > div').contains('2')

      cy.get('li > div > div > button').click()

      cy
        .get('nav > a')
        .contains('Delete Item')
        .click()

      cy
        .get('footer > a')
        .contains('Confirm')
        .click()
    })
  })
})
