# Meal Planner

## Project Goal
Automate meal planning.

1. Create an application to store meals that can easily be indexed by meal type (lunch, dinner...) or by protein.
1. Simple interface to manually plan meals for a week (or longer).
1. Generate shopping list based on meals in plan.
1. Generate meal plans that have diverse proteins, but conserve the variety of vegetables.
1. User can set their preference of similar/diverse protein/vegetables per week.

## Development
### Setup
Setup Postgresql

`createdb meal_planner_dev`

Then create a user for the app.

```
CREATE USER meal_planner_user;
GRANT ALL PRIVILEGES on database meal_planner_dev to meal_planner_user;
```

### Start client and server
Start the server: `npm run start:server`
Start the client: `npm run start`

### Info
The client is a single page react application with Redux and react-router.
The server is a express.js server that serves the client, static assets and provides the API.
