# Pet Store Application

This is a sample pet store application having the following features:

- View a list of pets or a single pet.
- Add new pets
- Edit pets
- Delete pets

## Set-up

### One time

1. Clone this repository
   `git clone https://github.com/aamirshaadalam/pet-store.git`

2. Open a terminal window. Now, navigate to the root folder of the cloned repository and install dependencies by executing `yarn install`.
   > You need to execute this step again whenever you add or remove any dependencies for the changes to take effect.

### Run the application

Open a terminal window. Now, navigate to the root folder of the cloned repository and execute `yarn dev`. This will fire-up the `json-server` api at port `3001` and _Pet Store_ application at port `3000`.

> You can now access the application at http://localhost:3000/ and the API at http://localhost:3001/v1/pets

## About the Application

The application has the following navigation options:

- Home
- Pets
- About Us
- Contact

`Home`, `About Us` and `Contact` pages are just a placeholder and contain dummy content.

### Pets page

The `Pets` page displays a paginated list of all the pets available at the pet store in a tabular form.

##### The user can perform following actions:

- View a list of pets available at the pet store
- View more info about a pet by clicking on the `pet name` in the tabe. This takes the user to the _Pet Info_ screen that contains a `pet name`, a dummy image and some dummy info about the pet.
- Add a new pet to the store
- Delete an existing pet
- Edit an existing pet
- Change the page size of the table
- Navigate through various pages (Number of pages depends on the total records and page size).

## About the code base

#### Components Folder

##### Path: `src/components`

This folder contains all the common components that can be used in any feature specific component.

Currently, this folder contains the following components:

| Component     | Usage                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| BusyIndicator | Display loading indicator while api requests are pending.                                                       |
| Modal         | Display dialog with dynamic content content                                                                     |
| NoMatch       | Default screen when the URL doesn't match any of the routes                                                     |
| Pagination    | Add pagination to a table                                                                                       |
| Toolbar       | Add toolbar to a table. Can be used for action elements. e.g. `add`, `search`, `edit`, `delete` buttons or more |
| Table         | Represent data in tabular form                                                                                  |

#### Features Folder

##### Path: `src/features/{subfolder}`

This folder contains the feature specific components. Since this application is simple, I have clubbed all the fetures under a single subfolder called `petStore`.

However, we can seggregate different features in their own subfolders. This will help in better structure and maintainability.

#### Fonts Folder

##### Path: `src/fonts`

This folder contains all the fonts used in the application.

#### Styles Folder

##### Path: `src/styles`

This folder contains all the styling files for the application. I have created one file per component so that it is easier to maintain.

#### API Folder

##### Path: `api`

This folder contains the JSON data file used by the `json-server`. The `json-server` makes use of the `db.json` file while the `db-bkp.json` is a backup of `db.json` file.

> The _`server.js`_ file in the root folder contains the _`json-server`_ configurations.

## Unit Tests

As the writing of the unit tests was optional, I have not written the unit tests for all the components. However, I have included the unit tests for `App.js`. The tests can be executed using the command: `yarn test`
