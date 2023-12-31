# Real Time Chat

This repository contains a real-time chat application. Users can join chat rooms, exchange messages, and create group chats.

## Technologies Used

The application is built using the following technologies:
- Node.js/Express.js<br>
  Backend is buit using Node.js/Express.js
- React.js<br>
  Frontend is built using React.js
- MongoDB<br>
  Used for store persistent data
- Mongoose<br>
  Used for data base manipulation
- Redis<br>
  Used for users online/offline status and rate limiter
- Socket.io<br>
  Used for real time chat and notifications
- JWT<br>
  Used for user authentication
- Jest<br>
  Used for writing and running unit tests
- Docker
  Used for containerized environment
  

## How to Run the Application

Follow the steps below to set up and run the application:

### Prerequisites

- Node.js installed on your machine
- Git installed on your machine
- Docker installed on your machine - optional

### Cloning repository

1. Clone the repository: git clone https://github.com/sejfudin/Real-Time-Chat-Application.git

### Running the Application in the Docker

1. Run Deocker on your local machine  
2. Run `docker-compose up --build`
3. Visit in the browser `http://localhost:3000/`

### Running the Application without the Docker

1. Navigate to the `api` folder and install dependencies: npm install
2. Navigate to the `ui` folder and install dependencies: npm install
3. Create `.env` file in api folder. You can refer to the `env.example` file for the required variables.
4. Start the API server:
   -Navigate to api folder and run `npm start`
5. Start the frontend:
   -Navigate to ui folder and run `npm start`
6. Visit in the browser `http://localhost:3000/`


### Features implemented

- User registration
- User login
- Real-time private and group chat functionality
- Searching users and sending private messages
- Ability to see online ostatus for users
- Grup creation, adding/removing users leaving group chat (Just admin can remove users from group)
- Rate limit on sending messages (50 messages per minute)
- Persistent data storage in a MongoDB database
- Unit tests for backend API endpoints

 ### Tests
#### Coverage:<br>
The following areas of the application have been test covered:<br>
- User registration
- User login
- User searching<br>
#### Execution<br>
To execute the written tests, navigate to the api folder in your terminal and run the command `npm run jest`

### Deployment
The applicatin is deployed on render.com. To show the application just visit this [LINK](https://live-chat-ui.onrender.com/)










