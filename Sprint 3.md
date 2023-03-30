Our Client Address:
http://memorly.kro.kr/

Our Server Address:
http://api.memorly.kro.kr/

# **Issues our team plans to address for Sprint 3**
- We want to finally implement the main feature of our app: creating and viewing flash cards!
- We also need to improve the login feature so that site navigation can be more comfortable for the user.  At the moment, our site does not have a log out feature and the site doesn't change how it looks if a user is or isn't logged in.
- We would like to spend some time making the website more visually appealing

# **Which issues were successfully completed**
- After the user has logged in, they are no longer prompted to log in again and are instead given a log out button
- The user can create folders of cards and can add cards to the folders
- The user can cycle through the cards in a folder forwards and backwards
- The user can flip cards over to show their front or back respectively
- Completed API to create a folder, create a card, get current user folders, and get the folder and cards of a user

# **Which issues were not completed and why** 
- Our site still needs some visual refining, but we were able to implement all of the core features we hoped to for this sprint.


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

### **Error**

| Code | Message                   | Case                                          |
| ---- | ------------------------- | --------------------------------------------- |
| 400  | Binding Error             | When the required input does not filled       |
| 400  | Folder Name Already Taken | When the input folder name is already existed |
| 500  | Database Error            | When the database does not response           |

## **Create Card**

Creating the Card with given title

**Expected Side Effect**

If the user does not logged in, it will throw an unauthorized error

### **Path**

POST  
api.memorly.kro.kr/card

### **Error**

| Code | Message        | Case                                                         |
| ---- | -------------- | ------------------------------------------------------------ |
| 400  | Binding Error  | When the required input does not filled                      |
| 400  | Not valid User | When the user trying to create card inside of other's folder |
| 500  | Database Error | When the database does not response                          |

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

Our API Documentation:
https://documenter.getpostman.com/view/12809852/2s93CRJqgL
