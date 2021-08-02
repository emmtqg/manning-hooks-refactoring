/// <reference types="cypress" />
import React, { useContext } from 'react'

import { startServer } from "../../src/server"
import { sales } from "../../src/store/sales.json"

describe("Polly dashboard", () => {
  let server;

  beforeEach(() => {

    server = startServer({ 
      environment: 'test'
    });

    // server.loadFixtures();
    server.logging = true;
    
    cy.intercept('/api/options', { fixture: '../../src/store/options.json' }).as('get-options');
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
  
  it("dropdown should call api/options to load select options", () => { 
    cy.intercept('/api/options', {
      status: 200,
      body: [
        { id: 1, label: "a", value: "a" },
        { id: 2, label: "b", value: "b" },
        { id: 3, label: "c", value: "c" }
      ]
    }).as('get-options');

    cy.visit('/');
    cy.wait('@get-options')
    cy.get('[data-test-id="select-chart"]')

    cy.get('.react-select__control') // find opened dropdown
    .should("be.visible");

    cy.get('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option') // find all options
    .should('have.length', 3)

    cy.get('.react-select__option:first-child').should('have.length', 1).contains("a")
    cy.get('.react-select__option:nth-child(2)').should('have.length', 1).contains("b")
    cy.get('.react-select__option:nth-child(3)').should('have.length', 1).contains("c")
  });

  it("dropdown should load current options fixture", () => { 
    cy.visit('/');
    cy.wait('@get-options');
    cy.get('[data-test-id="select-chart"]')
    .find('.react-select__control') // find opened dropdown 
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option') // find all options
    .should('have.length', 2)
  });

  it("should display test fetch sales data on Select option click", () => {
    cy.intercept('/api/sales', {
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
    }).as('get-sales');

    cy.visit('/');
    cy.wait('@get-options')
    cy.get('[data-test-id="select-chart"]')
    .find('.react-select__control') // find opened dropdown 
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option:first-child') // find all options
    .contains('Sales')
    .click()
    
    cy.wait('@get-sales')
    cy.get('main')
    .find('canvas')
    .should('be.visible')

    // TODO: https://www.valentinog.com/blog/canvas/
    // Snapshot testing of canvas
  })

  it("should display test fetch subscriptions data on Select option click", () => {
    cy.intercept('/api/subscriptions', {
      statusCode: 200,
      body: [
          {
              timestamp: "2020-06-17T06:44:02.676475",
              amount: 4,
          },
          {
              timestamp: "2020-06-17T06:45:30.983656",
              amount: 2,
          },
          {
              timestamp: "2020-06-18T06:45:30.983656",
              amount: 4,
          },
      ],
    }).as('get-subscriptions');

    cy.visit("/");   
    cy.get('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option:nth-child(2)') // find all options
    .contains('Subscriptions')
    .click()
    
    cy.wait('@get-subscriptions')
    cy.get('main')
    .find('canvas')
    .should('be.visible')

    // TODO: https://www.valentinog.com/blog/canvas/
    // Snapshot testing of canvas
  })

  it("selecting Sales option should create main and canvas components", () => {
    cy.intercept('/api/sales', { fixture: '../../src/store/sales.json' }
    );

    cy.visit('/')
    cy.wait('@get-options');

    cy.get('[data-test-id="select-chart"]')  
    .find('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option:first-child') // find all options
    .click()

    cy.get('main')
    .find('canvas')
    .should('be.visible')
    // TODO: https://www.valentinog.com/blog/canvas/
    // Snapshot testing of canvas
  });

  it("selecting Subscriptions option should create main and canvas components", () => {

    it("selecting Sales option should create main and canvas components", () => {
      cy.intercept('/api/subscriptions', { fixture: '../../src/store/subscriptions.json' }
      );
  
      cy.visit('/')
      cy.wait('@get-options');
  
      cy.get('[data-test-id="select-chart"]')  
      .find('.react-select__control') // find react-select component  
      .click() // click to open dropdown   
      .get('.react-select__menu') // find opened dropdown
      .find('.react-select__option:nth-child(2)') // find all options
      .click()
  
      cy.get('main')
      .find('canvas')
      .should('be.visible')
      // TODO: https://www.valentinog.com/blog/canvas/
      // Snapshot testing of canvas
    });
  });

  // Summary tests
  it.only("should see summary totals in each card", () => {
    cy.intercept('/api/sales', { fixture: '../../src/store/sales.json' }
    );
    server.loadFixtures('subscriptions')
    cy.intercept('/api/summaries', {
      statusCode: 200,
      body: {
        subscriptionsTotal: 2083,
        salesTotal: 87320,
      },
    }).as("get-summaries");

    cy.visit('/')
    cy.wait('@get-options');

    cy.get('[data-test-id="select-chart"]')  
    .find('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option:first-child') // find all options
    .click()

    cy.wait("@get-summaries");
    cy.get(".card").children().as("cardsChildren");

    cy.get("@cardsChildren").eq(0).should("have.text", "CellFast sales");

    cy.get("@cardsChildren").eq(1).should("have.text", "$ 87320");

    cy.get("@cardsChildren").eq(2).should("have.text", "CellNow subscriptions");

    cy.get("@cardsChildren").eq(3).should("have.text", "$ 2083");
  });
});
