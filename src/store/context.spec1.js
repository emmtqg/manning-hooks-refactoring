/// <reference types="cypress" />
import React, { useContext } from 'react'
import { render } from '@testing-library/react'
import { mount } from 'cypress-react-unit-test'

import { startServer } from '../server'
import options from './options'
import sales from './sales'
// import subscriptions from '../../src/store/subscriptions'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { DashboardProvider } from './DashboardContext';
import DashboardShell from '../features/Dashboard/DashboardShell';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function renderDashboard(endpoint) {
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
          <DashboardShell
            className="container"
          />        
      </DashboardProvider>
    </QueryClientProvider>
  );
}

describe("Dashboard Context", () => {
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

  it.only("should load the endpoint data and provide data to the Dashboard Shell", () => { 
    mount(renderDashboard());
    
  });

  it("select sales options should load sale data", () => {
    // cy.intercept('/api/sales', sales)
    cy.log('adding /api/sales stub')
    // cy.intercept('GET', '/api/sales', {
    //   statusCode: 200,
    //   body: {
    //     sales
    //   },
    // }).as('fetch-sales');
    // cy.visit("/");
    const useStubbedContext = () => {

      const context = useContext(DashboardContext);
      // context.fetchDataset(`${process.env.REACT_APP_BASE_URL}/sales`)
      context.fetchDataset = () => {
        return(sales);
      }
    }
    
    let data;
    function MockComponent() {
      data = useStubbedContext()
      return null
    }

    mount(<MockComponent />)
      .then(() => {
        expect(data.length).to.equal(2)
      })

    // context.fetchDataset = cy.stub().return(sales);

    // cy.intercept("GET", "/api/sales/", {
    //   statusCode: 200,
    //   body: [
    //       {
    //           timestamp: "2020-06-17T06:44:02.676475",
    //           amount: 1902,
    //       },
    //       {
    //           timestamp: "2020-06-17T06:45:30.983656",
    //           amount: 893,
    //       },
    //   ],  
    // }).as('fetch-sales');

    stubFetch();
    cy.visit("/");
    cy.get('.react-select__control') // find react-select component  
    .click() // click to open dropdown   
    .log('click to open dropdowon')
    .get('.react-select__menu') // find opened dropdown
    .find('.react-select__option') // find all options
    .contains('Sales')
    .click()
    cy.log('waiting for @fetch-sales intercept')
    
    // cy.wait('@fetch-sales');

    cy.get('main')
    .find('canvas')
    .should('be.visible')
  });
});