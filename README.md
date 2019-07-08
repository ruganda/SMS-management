# SMS-management
[![Build Status](https://travis-ci.org/ruganda/SMS-management.svg?branch=master&service=github)](https://travis-ci.org/ruganda/SMS-management)
[![Coverage Status](https://coveralls.io/repos/github/ruganda/SMS-management/badge.svg?branch=master&service=github)](https://coveralls.io/github/ruganda/SMS-management?branch=master)

**Application Features**

SMS:

- person sending sms
- person receiving sms
- message of sms
- sms status

Contact:

- name of person
- phone number of person


* The following relationship are represented in the model:

- All sms sent by a Contact are linked to them
- All sms sent to a Contact are linked to them
- Deleting a contact removes the messages they sent and references to messages they received.


**Application demo**

* To interact with the application via postman
     * https://rugandasmsAPIherokuapp.com/

    then use the following endpoints to perform the specified tasks
    
    EndPoint                                           | Functionality
    ------------------------                           | ----------------------
    POST /user                                         | Create a user account
    POST /user                                         | Add a contact
    GET /user                                          | View all contacts
    DELETE /user/0779850746                            | delete contact
    POST /auth/login                                   | Log in a user
    POST /message                                      | send a message
    GET /sent                                          | Retrieves all sent messages
    GET /recieved                                      | Retrieves all recieved messages
    DELETE /sent/< id >                                | Delete a sent message 
    DELETE /recieved/< id >                            | Delete a recieved message
    PATCH /recieved/< id >                             | Update the sms status to `read`

    
**Getting started with the app**

**Technologies used to build the application**

* Node js 

* Express

* [PostgreSQL](https://www.postgresql.org/)

* [JWT](auth0.com/docs/jwt)

* Mocha 

# Installation

- clone the repository
- install the packages by running `npm install`
- create a database called test_db 
- run migrations with `npm run migrate`
- start the project with `npm start`


# Testing
 - run `npm test` to run the tests