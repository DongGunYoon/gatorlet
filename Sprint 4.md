Our Client Address:
http://memorly.kro.kr/

Our Server Address:
http://api.memorly.kro.kr/


# **Which issues were successfully completed**
- The user will be able to create multiple cards at once after clicking on an empty card folder
- The user can edit folder names and delete folders
- The user can edit cards and delete cards
- A shuffle button that shuffles the cards in a folder (reverts to starting order when page is refreshed).
- UI changes to make the app more cohesive and visually appealing
- Completed API to edit and delete a folder, edit and delete a card.

# **List unit tests for frontend**
Unit tests:
- A test that checks that "Welcome to our CEN3031 Project!" is being displayed on the home page
- A test that checks the Memorly icon is being displayed in the header
- A test that checks that authService is created
- A test that checks that a password that is long enough is valid
- A test that checks that a password that is too short is not valid
- A test that checks that a username with non-alphanumeric characters is invalid
- A test that checks that a username with only alphanumeric characters is valid
- A test that checks that the front of the first card in a card array is being shown
- A test that checks that the back of the first card in a card array is being shown when the card is flipped
- A test that checks that the folder name is being displayed above the card when looking through the contents of a card folder
- A test that checks that the folder name is being displayed on the library page
- A test that checks that there are text boxes for five cards initially on the create cards screen
- Tests which check the add and remove card functions on the create cards screen
- A test that checks that the user will not be able to add cards from the create card screen if they have not filled out any card pairs
- A test that the user will be able to add cards when they have filled out a pair
- A test that checks that the shuffle function shuffles the cards

Cypress test:
- A test that logs in, clicks on a specific folder and checks that the front of the first card is being displayed properly, clicks to advance to the next card and checks that it is being displayed, then logs out


# **List unit tests for backend**
Unit tests:
- A test that checks that a folder was successfully created with the Create Folder API
- A test that checks if there is already a folder with the same name created using the Create Folder API
- A test that checks that folders were successfully displayed with the Get Folders API
- A test that checks that a card was successfully created with the Create Card API
- A test that checks that cards were successfully displayed with the Get Cards API

# **Detailed documentation of our backend API**

## **Sign Up User**

Registering an user with given email, password, and name.

**Expected Side Effect**

If the email is already in use, user need to use different email.

### **Path**

api.memorly.kro.kr/users/signup

### **Request Body**

| Property | Type   | Nullable | Description          |
| -------- | ------ | -------- | -------------------- |
| email    | String | N        | email of the user    |
| password | String | N        | password of the user |
| name     | String | N        | name of the user     |

### **Error**

| Code | Message             | Case                                    |
| ---- | ------------------- | --------------------------------------- |
| 400  | Binding Error       | When the required input does not filled |
| 400  | Email Already Taken | When the input email is already taken   |
| 500  | Database Error      | When the database does not response     |

## **Log In User**

Log In an registered user with given email, password.

**Expected Side Effect**

This api is working with registered user. If the user does not sign up our service, they need to sign up first to call this api.

### **Path**

api.memorly.kro.kr/users/login

### **Request Body**

| Property | Type   | Nullable | Description          |
| -------- | ------ | -------- | -------------------- |
| email    | String | N        | email of the user    |
| password | String | N        | password of the user |

### **Error**

| Code | Message            | Case                                             |
| ---- | ------------------ | ------------------------------------------------ |
| 400  | Binding Error      | When the required input does not filled          |
| 404  | No Matched User    | When the input email does not exist              |
| 401  | Incorrect Password | When the input password does not match with user |


## **Get User**

Getting an specific user information with given token which is set from the HTTP header as a key name "Authorization".

**Expected Side Effect**

This api is to check whether our JWT token is working well or not along with checking the information of User.  
Therefore, the accessToken value from either signUp or logIn api should be set to a HTTP Header. Failure to set the token or using an expired token will throw an error.

### **Path**

api.memorly.kro.kr/users/login

### **Error**

| Code | Message                         | Case                                  |
| ---- | ------------------------------- | ------------------------------------- |
| 400  | No Authorization Token Provided | When the token is not provided        |
| 401  | Invalid Token                   | When the given token value is invalid |
| 401  | Expired Token                   | When the given token is expired       |
| 404  | No Matched User                 | When the user email does not exist    |

## **Create Folder**

Creating the Folder with given title

**Expected Side Effect**

If the user does not logged in, it will throw an unauthorized error

### **Path**

POST  
api.memorly.kro.kr/folder

### **Request Body**

| Property | Type   | Nullable | Description         |
| -------- | ------ | -------- | ------------------- |
| title    | String | N        | title of the folder |

### **Error**

| Code | Message                   | Case                                          |
| ---- | ------------------------- | --------------------------------------------- |
| 400  | Binding Error             | When the required input does not filled       |
| 400  | Folder Name Already Taken | When the input folder name is already existed |
| 500  | Database Error            | When the database does not response           |

## **Get Folders**

Getting the folders of current user

**Expected Side Effect**

If the user does not logged in, it could not draw any folder

### **Path**

GET  
api.memorly.kro.kr/folders

### **Error**

| Code | Message        | Case                                    |
| ---- | -------------- | --------------------------------------- |
| 400  | Binding Error  | When the required input does not filled |
| 500  | Database Error | When the database does not response     |


## **Get Folder**

Getting the folder and cards of current user

**Expected Side Effect**

If the user does not logged in, it could not get any folder

### **Path**

GET  
api.memorly.kro.kr/folders/:id

### **Error**

| Code | Message        | Case                                    |
| ---- | -------------- | --------------------------------------- |
| 400  | Binding Error  | When the required input does not filled |
| 500  | Database Error | When the database does not response     |

## **Update Folder**

Updating the existed Folder

**Expected Side Effect**

If the user does not logged in, it will throw an unauthorized error

### **Path**

PUT  
api.memorly.kro.kr/folders/:folderId

### **Request Body**

| Property | Type   | Nullable | Description         |
| -------- | ------ | -------- | ------------------- |
| title    | String | N        | title of the folder |

### **Error**

| Code | Message           | Case                                    |
| ---- | ----------------- | --------------------------------------- |
| 400  | Binding Error     | When the required input does not filled |
| 404  | No Matched Folder | When the folder does not found          |
| 500  | Database Error    | When the database does not response     |

## **Delete Folder**

Delete the existed Folder

**Expected Side Effect**

If the user does not logged in, it could not delete Folder

### **Path**

DELETE  
api.memorly.kro.kr/folders/:id

### **Error**

| Code | Message           | Case                                |
| ---- | ----------------- | ----------------------------------- |
| 404  | No Matched Folder | When the folder does not found      |
| 500  | Database Error    | When the database does not response |

## **Create Card**

Creating the Card with given title

**Expected Side Effect**

If the user does not logged in, it will throw an unauthorized error

### **Path**

POST  
api.memorly.kro.kr/card

### **Request Body**

| Property | Type   | Nullable | Description          |
| -------- | ------ | -------- | -------------------- |
| folderId | String | N        | id of the folder     |
| question | String | N        | question of the card |
| answer   | String | N        | answer of the card   |

### **Error**

| Code | Message        | Case                                                         |
| ---- | -------------- | ------------------------------------------------------------ |
| 400  | Binding Error  | When the required input does not filled                      |
| 400  | Not valid User | When the user trying to create card inside of other's folder |
| 500  | Database Error | When the database does not response                          |

## **Update Card**

Updating the existed Card

**Expected Side Effect**

If the user does not logged in, it will throw an unauthorized error

### **Path**

PUT  
api.memorly.kro.kr/cards/:cardId

### **Request Body**

| Property | Type   | Nullable | Description          |
| -------- | ------ | -------- | -------------------- |
| question | String | N        | question of the card |
| answer   | String | N        | answer of the card   |

### **Error**

| Code | Message         | Case                                    |
| ---- | --------------- | --------------------------------------- |
| 400  | Binding Error   | When the required input does not filled |
| 404  | No Matched Card | When the card does not found            |
| 500  | Database Error  | When the database does not response     |

## **Delete Card**

Delete the existed Card

**Expected Side Effect**

If the user does not logged in, it could not delete Card

### **Path**

DELETE  
api.memorly.kro.kr/cards/:id

### **Error**

| Code | Message         | Case                                |
| ---- | --------------- | ----------------------------------- |
| 404  | No Matched Card | When the card does not found        |
| 500  | Database Error  | When the database does not response |

## **Create Cards**

Creating the Cards with given question and answer to folder

**Expected Side Effect**

If the user does not logged in, it will throw an unauthorized error

### **Path**

POST  
api.memorly.kro.kr/cards

### **Request Body**

| Property | Type         | Nullable | Description      |
| -------- | ------------ | -------- | ---------------- |
| folderId | String       | N        | id of the folder |
| cards    | Object Array | N        | list of card     |

### **cards**

| Property | Type   | Nullable | Description          |
| -------- | ------ | -------- | -------------------- |
| question | String | N        | question of the card |
| answer   | String | N        | answer of the card   |

### **Error**

| Code | Message        | Case                                                         |
| ---- | -------------- | ------------------------------------------------------------ |
| 400  | Binding Error  | When the required input does not filled                      |
| 400  | Not valid User | When the user trying to create card inside of other's folder |
| 500  | Database Error | When the database does not response                          |

Our API Documentation:
https://documenter.getpostman.com/view/12809852/2s93CRJqgL
