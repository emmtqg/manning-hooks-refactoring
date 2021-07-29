/// <reference types="cypress" />
import { startServer } from "../../src/server"
import options from "../../src/store/options"
import sales from "../../src/store/sales"
// import subscriptions from "../../src/store/subscriptions"

describe("Polly dashboard", () => {
  let server;

  beforeEach(() => {
    server = startServer({ 
      environment: 'test', 
      fixtures: { options }
    });
    server.logging = true;
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should show Aside title (h2) with content", () => 
  {
    cy.visit("/");

    cy.get('Aside')
    .find('[data-test-id="aside-title"]')
    .should('be.visible.and.not.empty')   
  });
  
  it("dropdown should load and generate select options", () => { 
    cy.visit('/');
    // cy.wait('@get-options')
    cy.get('[data-test-id="select-chart"]')

    cy.get('.react-select__control') // find opened dropdown
    .should("be.visible");

    cy.get('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option') // find all options
    .should('have.length', 2)
  });

  it.only("select sales options should load sale data", () => {
    // cy.intercept('/api/sales', sales)
    cy.log('adding /api/sales intercept')
    // cy.intercept('GET', '/api/sales', {
    //   statusCode: 200,
    //   body: {
    //     sales
    //   },
    // }).as('fetch-sales');
    cy.intercept("GET", "/api/sales/", {
      statusCode: 200,
      body: [
          {
              timestamp: "2020-06-17T06:44:02.676475",
              amount: 1902,
          },
          {
              timestamp: "2020-06-17T06:45:30.983656",
              amount: 893,
          },
      ],  
    }).as('fetch-sales');

    cy.visit("/");
    cy.get('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .log('click to open dropdowon')
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option') // find all options
    .contains('Sales')
    .click()
    cy.log('waiting for @fetch-sales intercept')
    cy.wait('@fetch-sales');

    cy.get('main')
    .find('canvas')
    .should('be.visible')
  });

  it("dropdown should load and generate select options", () => {
    server.db.loadData({ sales: sales }); 

    cy.visit("/");
    cy.get('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option') // find all options
    .contains('Sales')
    .click()

    cy.get('main')
    .find('canvas')
    .should('be.visible')
  });
});
