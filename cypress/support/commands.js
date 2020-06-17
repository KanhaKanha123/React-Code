// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// Cypress.Commands.add('initialize', () => {
//   // this is an example of skipping your UI and logging in programmatically

//   // setup some basic types
//   // and user properties
//   cy.window().then(win => {
//     const store = win.__REACT_STORE__

//     store.dispatch({
//       type: 'APP/APP_SET_API_ROOT',
//       payload: { apiRoot: this.config.apiRoot }
//     })

//     store.dispatch({
//       type: 'APP/APP_SET_STORE_ID',
//       payload: { storeId: this.config.storeId }
//     })

//     store.dispatch({
//       type: 'APP/APP_INITIALIZE'
//     })
//   })
// })
Cypress.Commands.add('login', () => {
  // this is an example of skipping your UI and logging in programmatically

  // setup some basic types
  // and user properties
  var user = {
    alive: false,
    domain: '',
    error: null,
    id: 'APIUSER',
    isRequesting: false,
    lastUpdated: null,
    name: 'Administrator',
    requiresDomain: true
  }

  cy.window().then(win => {
    const store = win.__REACT_STORE__
    debugger
    store.dispatch({
      type: 'APP/APP_SET_API_ROOT',
      payload: { apiRoot: 'http://212.188.254.94:7417' }
    })

    store.dispatch({
      type: 'APP/APP_SET_STORE_ID',
      payload: { storeId: '0' }
    })

    store.dispatch({
      type: 'APP/APP_INITIALIZE'
    })

    store.dispatch({
      type: 'SESSION/REQUEST_LOGIN'
    })

    store.dispatch({
      type: 'SESSION/RECEIVE_LOGIN'
    })

    store.dispatch({
      type: 'SESSION/START_SESSION',
      payload: { id: 1 }
    })

    store.dispatch({
      type: 'SESSION/SUCCEED_LOGIN',
      payload: { user: user }
    })
  })
})
