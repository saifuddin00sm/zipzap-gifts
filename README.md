# Zip Zap Gifts

An AWS Amplify project for Zip Zap Gifts.

## Notes

Copy the .env.example file to .env and ask nicely for the values to fill it up with.

You need to have Node 17+ running on your local machine for development.

In the amplify/backend/api/zipzap/cli-inputs.json file, you will need to make the `"gqlSchemaPath"` an absolute path on your machine to be able to properly use the amplify GraphQL commands.

# AWS Amplify

This project is managed by AWS Amplify, which handles everything from the backend to deployment to hosting.

Install the Amplify CLI (Command Line Interface) tool with `npm install -g @aws-amplify/cli` and run `amplify configure` to set up the tool locally.

To get the most current version of the project, run `amplify pull`. It is good practice to run `amplify pull` to fetch changes from upstream before beginning work on new backend features.

Please read the [Team Environments Overview](https://docs.amplify.aws/cli/teams/overview/) to see how to switch between dev and prod environments.

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Some Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
