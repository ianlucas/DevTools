# DevTools

A framework to quickly set up a development tools environment.

## Included Apps

* **Service Log App** - A configurable integration log viewer that can handle database table and request/response data using user-generated scripts that display further information that helps development and defect investigation.

## Getting Started

1. Clone the repo;
2. Create a folder called `custom` at `./src`;
3. Create a file named `locale.js` exporting a simple object - it must be created and it can overwrite the values of `./src/locale.js` file;
4. Configure the apps that will be used.

### Service Log App

* To setup this app, you need to create a file at `./custom/ServiceLogApp.js` exporting an object with two functions and a property.
  * `environments` an array of objects with `id` and `name` properties that are displayed on screen for selection;
  * `beforeFetch` function should return the final query that will be sent to the `fetch` function, it has two parameteres:
    * `query` (String) - the query text written in the screen editor;
    * `page` (Number) - the current page to help you paginate the results;
    * returns any type.
  * `fetch` function should return an object with the results of the query, it has three parameteres:
    * `enviroment` (String) - the id of the enviroment chosen in the screen;
    * `query` (Any) - the query processed at `beforeFetch`;
    * `analysis` (Object) - an object that use the files on `./custom/ServiceAnalysis` to analyse the given service name, request and response. It has a function `analyse` that takes three parameteres: `name`, `request` and `response` (expects String);
    * should return an object with three properties:
      * `type` (String) - the type of display of the results. It can be `log` or `table`;
      * `canFetchMore` (Boolean) - tells the app if it can fetch more results;
      * `rows` (Array of Objects) - the results as an array of objects.
