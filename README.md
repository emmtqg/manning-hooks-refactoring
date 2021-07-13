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

## Lesson 1
### Approach

Using miragejs (a great library to learn about, thank you!), I created the paths for the 'subscribers' and 'sales' graph options. I also used the server factory 'seed' options to populate the chart select options menu. This eventually could be extended to utilize a configuration file that would list the chart options and dynmically populate the select option menu.

I created the SelectChart component to encompass the Select option dropdown (which the react-select package was used for, primarily for its styling) and to call the useFetch hook to perform a dynamic load of the Select options from the mirage 'server'. 

I first implemented an inline fetch with useState and useEffect within the SelectChart.js component, but then extracted it to have a seperate fetch component. In researching a generic fetch component, I found the one used in SmashingMagazine, https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/, which caches fetch results (since none will be dynamically updated for this implmentation) and uses useEffect to call the actual fetch, and also a try/catch to capture and return any errors. It also uses a reducer to simplify the state return to the calling component.

In the next iteration of this useFetch, I would like to utilize react-query which has a nice caching mechanism, along with other functionality that facilitates the overall app data management for both retrieval and mutation opertions (check out https://react-query.tanstack.com/).

I wanted also to experiement with Error Boundaries as well, so included them in the component I wrote so I could get a feel for using them. I grouped the component specific error handlers in the ./src/common/components/errors/ComponentError.js. These functional components should probably go in their own seperate files, but because they are so brief and this is an experiement on how to best manage the actual files, I left them in the one file.

I'd also like to start to convert this to typescript for practice if that is ok. I realize it's unrelate to the course, but it would just be for my own edifiction.

Thanks for a fun project!