# Money Map - Navigate Your Finances with Ease

Money Map is a comprehensive full-stack MERN application designed to help users manage their finances effectively. Built with GraphQL, this application provides an intuitive and user-friendly interface for tracking expenses and managing transactions.

## Features

- **Track Finances**: The homepage features a simple and informative chart that provides a visual summary of the user's financial status.
- **Add Transactions**: Users can easily add transactions through a form on the homepage.
- **Transaction History**: The history page displays transaction cards in different colors based on the transaction type - savings, expenses, or investments. This visual differentiation helps users quickly identify and review their financial activities.
- **Update Transactions**: An update button is available for users to modify their existing transactions, ensuring that their financial records are always accurate.
- **Caching**: The application utilizes cookies for caching, which prevents reloading of pages when users navigate back to them. This cache is cleared upon user logout to ensure data security and privacy.
- **Authentication**: PassportJS is integrated for user authentication, providing a secure login and registration system.

## Tech Stack

- **Frontend**: React, Apollo Client
- **Backend**: Node.js, Express, MongoDB, GraphQL
- **Authentication**: PassportJS
- **State Management**: Apollo Client

## Live Demo

Check out the live demo of the project [here](https://money-map-k1zi.onrender.com/).

## Installation

1\. Clone the repository:

```bash
git clone https://github.com/yourusername/money-map.git
cd money-map
```

2\. Install dependencies:

```bash
npm install
cd .\frontend\
npm install
```

3\. Create a .env file in the root directory and add your MongoDB URI and secret key:

```bash
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_secret_key
```

4\. Start the development server:

```bash
npm run dev
```

## Usage

- **Registration/Login:** Users begin by registering for an account or logging into an existing one.
- **Add Transactions:** Once logged in, users can add new transactions using the form on the homepage.![updateTransaction](https://github.com/user-attachments/assets/06a4421e-3576-4dab-8888-64226adb0e55)

- **View Summary:** The homepage chart provides an overview of the user's financial status.
- **Transaction History:** Users can view their transaction history on the history page, with color-coded cards for different transaction types.
- **Update Transactions:** If needed, users can update their transactions using the provided update button.
- **Logout:** Logging out will clear the cache, ensuring that the user's session is secure.
  
## Screenshots

- **Sign Up** ![signUp](https://github.com/user-attachments/assets/ea653659-b370-4373-a90d-288fb5a09f40)
- **Login** ![login](https://github.com/user-attachments/assets/de18ead4-e3e7-44d1-8e98-eb885a36c3f3)
- **Homepage** ![homepage](https://github.com/user-attachments/assets/92db663a-4339-41e9-b35f-e91c0323b875)
- **History** ![history](https://github.com/user-attachments/assets/cb394d9a-eb89-4101-878e-c92546ae7473)
- **Update Transaction** ![updateTransaction](https://github.com/user-attachments/assets/f0e13761-b713-4463-96eb-635337fc208b)
