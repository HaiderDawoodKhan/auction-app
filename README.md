---

# MERN Stack Auction App

## Description

This project is a full-stack MERN web application. It is an auction app that supports real-time bidding through Sockets.io. The app allows users to sign up, log in, bid on items, create auctions, and win items. Key features include robust error handling, protected routes, and secure authentication mechanisms. This project demonstrates the integration of front-end and back-end technologies to deliver a seamless user experience in a dynamic auction environment.

## Features

- **User Authentication**: Secure signup and login functionality.
- **Real-Time Bidding**: Real-time updates and bidding through Sockets.io.
- **Auction Management**: Users can create, view, and manage auctions.
- **Error Handling**: Robust error handling to ensure a smooth user experience.
- **Protected Routes**: Secure routes to protect user data and actions.

## Tech Stack

- **Front-End**: React.js
- **Back-End**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Sockets.io
- **Authentication and State Management**: Redux and Redux toolkit
- **Styling**: CSS


## Usage

1. **Sign Up / Log In**: Create an account or log in with existing credentials.

<img width="736" alt="Screenshot 2024-05-18 at 8 18 58 PM" src="https://github.com/HaiderDawoodKhan/auction-app/assets/157682455/032ee51f-c7fb-4a2c-a23a-a66aea041a63">

2. **Create Auctions**: Navigate to the create auction page and fill in the required details to create an auction.

<img width="736" alt="Screenshot 2024-05-18 at 8 20 25 PM" src="https://github.com/HaiderDawoodKhan/auction-app/assets/157682455/67053de7-f285-4bf2-8cc5-b0fed6d95e83">

3. **Browse Auctions**: View the list of available auctions and click on any auction to view details.

<img width="736" alt="Screenshot 2024-05-18 at 8 21 33 PM" src="https://github.com/HaiderDawoodKhan/auction-app/assets/157682455/28b041a5-b933-47ff-933d-f15b399ce64a">

4. **Place Bids**: Participate in an auction by placing bids in real-time.

<img width="736" alt="Screenshot 2024-05-18 at 8 22 03 PM" src="https://github.com/HaiderDawoodKhan/auction-app/assets/157682455/76f0637e-7282-4fa8-85a2-67343dc7c4bf">

5. **Win Items**: If your bid is the highest when the auction ends, you win the item (visible in profile).

<img width="736" alt="Screenshot 2024-05-18 at 8 21 00 PM" src="https://github.com/HaiderDawoodKhan/auction-app/assets/157682455/58e60e39-caca-43c1-b836-2dc11e86bc32">

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:
   - For the server:
     ```bash
     cd backend
     npm install
     ```
   - For the client:
     ```bash
     cd frontened
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `server` directory and add the following:
     ```plaintext
     MONGO_URI=your_mongoDB_connection_string     ```

4. **Run the Application**:
   - Start the server:
     ```bash
     cd backend
     npm run dev
     ```
   - Start the client:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the App**:
   - Open your browser and go to `http://localhost:3000`.

---