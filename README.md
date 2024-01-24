# Technical Test - SP

## Routes

### /api/files

You must pass a CSV file in the field 'files' to save users

The CSV follow the headers: **name**, **city**, **country**, **favorite_sport**

The expect return is **201**. with the message `Users Created`


### /api/users

Return a list of users. Accept the params below:

- q
  - To filter users based on the string
- page
  - To set the page of users
- limit
  - Defines how many users must return
 
The expect return is **200**. with the corpse that follows bellow:
- Elements
  - An array that contains the users listed
- Total Elements
  - The number of elements that follows the string passed on `q` or if none was passed, the total of users
- Page
    - A number to limit how many users is filtered. Work with the number that was inserted in **limit**
- limit
    - The max number of users to list
 
This route, by default, brings 50 users.


## How execute this API

### Requiriments

Its necessary use the version 19.7 of nodejs

### Install
Run the command `npm i`

### Tests
Run the command `npm run test`

### Run in dev mode
Rum the command `npm run dev`
