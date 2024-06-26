# Project Name

'Say it' is a chat-like social application, where users can share their opinions on any topic.
Register, create a topic, say something and like what other users say.

Express, Impress, and Simply Say it!


## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

Main features of the application here.

- User Registration
- User Login
- Avatar Upload
- Create Topics
- Create Posts
- Delete Posts
- Like Posts
- See your own posts
- See your own likes
- Password Change

## Demo

https://sayit-el0l.onrender.com/

## Installation

Step-by-step instructions on how to install and set up the application locally.
Keep in mind that you will need to also configure your own environmental variables, such as port number, mongodb url and jwt secret.

1. Clone the repository:
   ```bash
   git clone https://github.com/anyajegorova/Sayit.git

2. Install fependencies for front-end
    ```bash
    cd notepost
    npm install

2. Install dependencies for back-end
    ```bash
    cd ..
    cd server
    npm install

3. Start the development server
    ```bash
    npm run dev

4. Start the front end
    ```bash
    cd ..
    cd notepost
    npm run dev

## Usage

1. User Registration and Login
- Users can register for an account by providing their email address, username and password.
Both username and password must be unique. Password lenght and content is not restricted.
- Users can login using their credentials such as email and password.

2. Profile Management
- After logging in, users can change their password in Profile section. 
- Users can also add and update the profile image. Avatar image is not compulsory and in case if no image is uploaded, first letter of username is set as avatar by default.

3. Creating and editing content
- Authenticated users can create new content, such as topics and posts. Users can delete their own posts in profile section

4. Interacting with content
- Users can like and unlike posts created by users as well as their own posts
- Users can see all the liked posts in Likes section

5. Responsive design
- The application is designed to be responsive, ensuring a seamless experience across various devices and screen sizes.

6. Security
- User authentication and authorization are implemented securely using JWT (JSON Web Tokens).
- Passwords are hashed before being stored in the database to protect user privacy.

7. Error Handling
- The application provides clear error messages and handles edge cases using React-Toastify package for showing toast messages for seemless user experience. 

## Technologies Used

### Core Technologies

- MongoDB: NoSQL database used for storing application data.
- Express.js: Web application framework for building RESTful APIs.
- React.js: JavaScript library for building user interfaces.
- Node.js: JavaScript runtime environment for server-side code execution.


### Additional Technologies and Libraries

- Vite: Frontend build tool used for fast development and optimized production builds.
- React Router DOM: Library for declaratively managing routes in React applications.
- React Toastify: Library for displaying toast notifications in React applications.
- js-cookie: Library for handling browser cookies in JavaScript.
- jwt-decode: Library for decoding JWTs on the client-side to get user information.

- bcrypt: Library for hashing passwords securely.
- body-parser: Middleware for parsing incoming request bodies in Express.js.
- cookie-parser: Middleware for parsing cookies in Express.js.
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- moment: Library for parsing, validating, manipulating, and formatting dates.
- mongoose: MongoDB object modeling tool for Node.js.
- multer: Middleware for handling multipart/form-data in Express.js for file uploads.
- dotenv: Zero-dependency module that loads environment variables from a .env file into process.env.

