# Refactoring to React Hooks - liveProject
> Base repo

## Getting started

Install the dependencies with

```bash
npm ci
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Module 1
### Approach

Using miragejs (a great library to learn about, thank you!), I created the paths for the 'subscribers' and 'sales' graph options. I also used the server factory 'seed' options to populate the chart select options menu. This eventually could be extended to utilize a configuration file that would list the chart options and dynmically populate the select option menu.

I created the SelectChart component to encompass the Select option dropdown (which the react-select package was used for, primarily for its styling) and to call the useFetch hook to perform a dynamic load of the Select options from the mirage 'server'. 
### Details

I first implemented an inline fetch with useState and useEffect within the SelectChart.js component, but then extracted it to have a seperate fetch component. In researching a generic fetch component, I found the one used in SmashingMagazine, https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/, which caches fetch results (since none will be dynamically updated for this implmentation) and uses useEffect to call the actual fetch, and also a try/catch to capture and return any errors. It also uses a reducer to simplify the state return to the calling component.
### Up Next

In the next iteration of this useFetch, I would like to utilize react-query which has a nice caching mechanism, along with other functionality that facilitates the overall app data management for both retrieval and mutation opertions (check out https://react-query.tanstack.com/).

I wanted also to experiement with Error Boundaries as well, so included them in the component I wrote so I could get a feel for using them. I grouped the component specific error handlers in the ./src/common/components/errors/ComponentError.js. These functional components should probably go in their own seperate files, but because they are so brief and this is an experiement on how to best manage the actual files, I left them in the one file.

I'd also like to start to convert this to typescript for practice if that is ok. I realize it's unrelate to the course, but it would just be for my own edifiction.

Thanks for a fun project!


## Module 2: Custom React Fetch Hook

### Overview
I swear I did not look ahead while preparing Module 1! Since the standalone custom fetch hook met the objectives for Module 2, I used miragejs to test the error display and fine-tuned those components.


## Module 3: Removing redux/Adding Context

### Overview
I did not remove the redux libaries/files in case I want to go back and review the redux functionality. I have seperate branches for the lessons, but still wanted them in the main branch for reference. I never really 'got' redux intuitively until I removed it in this lesson and directly replaced it with the context. That is one huge gain from this exercise - thank you!

I did put in a fetch call for the chart (the initial useFetch call is for the dynamically loaded select options which I left in there). I fully expect to revisit that in the next lesson, therefore didn't implement the status/error handling here. I did put a conditional for the chart display if no chart type selection is made.

I completely commented out a DashboardContext Provider component in the store area intending to implement it for the next lesson (or, maybe it'll get deleted!).

## Module 4: Writing Tests for the Application, and More Refactoring

### Overview
Created a seperate API call for the summary data. I calculated the summaries in the server.js file as a 'real' API would do the calculations in a typical use case.

A second instance of the miragejs server is started from the Cypress spec and the options, sales and subscription data are loaded via Cypress intercepts (which load external json files with the various data sets). I left them in the /store directory to keep the data store consistent between development and test.

I added a REACT_APP_ENV environment variable because the CRA NODE_ENV does not get updated with Cypress. I added another start mode for the react app, yarn start:test which sets the REACT_APP_ENV variable so the correct miragejs server is started for both development and test.

The Cypress test cases were sometimes not straightforward in that the API calls to intercept were generated from the api URL switching that is done on the Select option clicks.

## Module 5: Creating reusable context provider and writing unit tests

### Overview
The context provider in App.js generically supports different urls via passing the
setUrl functionality to it's children. The unit tests support testing the Summary container and fetch hook functionality. The react-query library was utiilized to maintain data state is is exetensible to providing mutation and caching functions for the backend data maintainence.

After revisiting the project, many of the packages, etc are outdated and there were a lot of configuration issues with my npm and legacy package support! Coupled with github's new Token authentication for git operations, added a little drama to finishing up the project :)

## Conslusion
I found this Live Project very interesting and pertinent in my work. I really like the generalization and extendability of the code we generated and found much value in the resources provided in the modules. Thanks!
