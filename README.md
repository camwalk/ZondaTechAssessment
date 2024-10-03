# Enterprise SEII Code Test

## Introduction

Congratulations on making it to the code test! Firstly you will want to do a little setup to
get the project up and running. This repository contains a skeleton for a React app which you
will build upon, and a JSON data file.

The task involves creating a NodeJS API which will serve the data from the JSON data file,
and extending the skeleton React app so that it fetches the data from your API and displays it.

It is up to you how long you spend on the task but we recommend approximately 1-2 hours. Please read
all the way through this document before starting as there are important details below.

## Setup

### Prerequisites

You will need to have NodeJS installed on your machine before starting:
- https://nodejs.org/en/download

You will also need git installed so you can clone this repository, create your branch
and commit your changes:
- https://git-scm.com/book/en/v2/Getting-Started-Installing-Git


### Repo Setup

Create your own repository from this template by using the "Use this template" button. For more details
on this step, see the [github docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

Once you have created a a new repository under your own github account containing the code from this template repo, clone it down to your computer so you can work on it.

### Api Setup

Next you will need to create a NodeJS project for your API.

If you are unfamiliar with the steps involved there are plenty of resources online (e.g. [this](https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9) and [this](https://medium.com/@onejohi/building-a-simple-rest-api-with-nodejs-and-express-da6273ed7ca9)).

We suggest that your API project is created in a folder called `api` alongside the existing `web` folder.

Once you have got your API project up and running, copy the `sample-data/subdivision.json` file into your API folder.

### React App Setup

Change into the React app folder (`cd web`) and run `npm install`

Then try running the skeleton app to confirm it is working before you begin making changes: `npm start`

## The Task

Now you are all set up, here's some more detail on the task itself. The exercise is broken down into several stages.

### Part 1 - Implement an API endpoint to serve the JSON data

Create an API endpoint within your API project which serves the JSON data from the provided `subdivision.json` data.

### Part 2 - Update the React app to fetch the data from the API and display it

Next, extend the skeleton React app provided so that it will connect to your API, fetch the data from it, and display it. The data can be displayed in any way you so choose (e.g. table / list / map / chart) and any third party libraries can be chosen to aid in this. You can see the structure of the data by opening the `subdivision.json` file in your code editor.

Note: the provided JSON file contains around 1000 subdivisions but is only a tiny sample of the subdivision data Zonda holds. Your application should be designed to handle any amount of subdivision data so you will need to consider this when choosing how to display the data and use an appropriate approach that will work well with large data sets (e.g using pagination or infinite scrolling if displayed in a table).

### Part 3 - Add Filtering/Sorting features to the application

Give the user the ability to filter the data based on `subdivisionStatusCode` (this can be either `Active`, `Future` 
 or `Builtout` - See Glossary below).
 
Also, allow the user to sort the data based on subdivision `name` or `nearMapImageDate`.

Note that you may also need to make changes to your API implementation in order to support these features.

### Part 4 - Add some tests

Finally, write some automated tests for the code that has been written.

If you start to run out of time at this point and don't have time to write all the tests you'd ideally like to add, then just attempt one example test for your API code and one example test for your React app code and just include empty placeholder tests (or comments) listing the tests you didnt have time to write, to show what tests you would have added.

Recommended test tools would be [React Testing Libary](https://testing-library.com/docs/react-testing-library/intro/) for component unit tests for React components and [Jest](https://jestjs.io/) for testing the API, but feel free to use any other automated testing tools you prefer if you are more familiar with them.

## Submitting your work
When you are finished, please ensure your repo is public so that we will be able to access it, and email us the github repo URL for us to review. We will review it before your technical interview.

**Important**: Please ensure to submit your work to us no later than the day before your technical interview so that we have time to review it prior to the interview. If you think this will not give you enough time, please let us know in case the technical interview needs to be rescheduled.

## Glossary

- Subdivision - An area of land containing lots or plots of land for property development
- Subdivision status code - The status of the subdivision. Can either be:
    - Active: This subdivision has ongoing construction
    - Future: This subdivision will have construction in the near future
    - Builtout: This subdivision's construction has been completed
- NearMap - one of the providers used at Zonda Satellite for our satellite image data
