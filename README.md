# Project Name: Tree Oasis

This README file provides instructions for setting up and running the application locally.

## Live URL
 ```url
   https://level2-assignment4-server.vercel.app/
   ```
## Features




### Product and Category Management

- **Sign Up**: Allow users to register with the platform.
- **Login**: Enable users to authenticate and receive JWT tokens.

### Facility Management

- **Product List Table**: Display products with image, title, price, category, and actions.
- **Action Buttons**: Update and delete products with modals.
- **Adding a Product**: Form for adding products with real-time UI updates.

### Product Browsing

- **Filtering, Pagination, Sorting, Searching**: Advanced options for browsing products.
- **Product Details**: View detailed product information.

### Shopping Cart
- **Add to Cart**: Add products with quantity management.
- **Proceed to Checkout**: Navigate to the checkout page.

### Checkout and Payment
- **Order Creation**: Collect customer details and manage stock.
- **Payment Options**: Stripe integration and Cash on Delivery (COD).



## Technologies Used
- TypeScript
- React.js
- Redux
- Stripe.js

# Getting Started

## Prerequisites

* **Software:**
    * Node.js (version 20.11.1 or higher)
    * npm Package Manager

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Anamul9901/level2-assignment4-client.git
   ```

2. **Navigate to my project directory**
```bash
 level2-assignment4-client
```

3. **Install dependencies**

    install the required dependencies using npm:

   ```bash
   npm install
   npm create vite
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm i -D daisyui@latest
   npm install @reduxjs/toolkit react-redux
   npm install sweetalert2
   npm install react-icons --save
   ```

4. **Add ENV file**

Add you `.env.local` file on the root

Add this environment variables on this `.env` file. 
And also add your mongoDB  `DATABASE_URL`.
```bash
VITE_Payment_Gateway= <<add you stripe secrate>>
```



## Running the application

1. **Start the development server**

   Run the following command to start the development server:

   ```bash
   npm run dev
   ```

   This will typically start the server on port 5173 by default

2. **Access the application**

   Open your web browser and navigate to http://localhost:5173 to access the running application.

## Contributing

This format provides clear instructions for running my application locally.