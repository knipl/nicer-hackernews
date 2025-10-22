# its a nicer hackernews!
Using hackernews API 
https://github.com/HackerNews/API 

With a custom react frontend for better user experience 

## about the project
This app is not planned to go to production.

The boilerplate code is generated via the react router framework starer app. https://reactrouter.com/start/framework/installation

Did not focus too much on performance optimisation since the website will not be used by many. But there are opportunities, to:
- cache responses for a few minutes when switching tabs
- request less items on first load to speed up initial load time
- do pre fethcing of the data, not on mount.

## Features
Separate service layer handles the networking and stores the API endpoints.

Building on the service, a **custom hook** handles the business logic and the state management. No separate state management tool was used for this implementation, since its a simple data model, with no plans of extending.

Simple date format util function, to avoid needing a separate date formatter package.

Simple DRY ui components taking care of rendering only.

### Installation

`npm i`

`npm run dev`


