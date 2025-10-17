# BitechX_PM - Product Management Dashboard

BitechX_PM is a modern product management dashboard built with Next.js, Redux Toolkit, and Tailwind CSS. It offers a clean and responsive interface for managing products, categories, and user authentication, tailored for e-commerce and internal tools.

<!-- ![BitechX_PM Dashboard](https://github.com/imamulkadir/BitechX_PM/raw/main/public/preview.png) -->

## 🚀 Features

- **Authentication**: Secure login system with JWT-based token authentication.
- **Product Management**: Full CRUD operations for products, including pagination and search functionality.
- **Category Management**: Manage product categories with pagination and search capabilities.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices using Tailwind CSS.
- **State Management**: Centralized state management with Redux Toolkit.
- **API Integration**: Seamless integration with the BitechX API for data operations.

## 🛠️ Technologies Used

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **State Management**: Redux Toolkit
- **API**: BitechX API for product and category data
- **Authentication**: JWT (JSON Web Tokens)
- **Development Tools**: Yarn, ESLint, Prettier

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/imamulkadir/BitechX_PM.git
cd BitechX_PM
yarn install
```

## ⚙️ Development

Start the development server:

```bash
yarn run dev
```

Open http://localhost:3000 in your browser to view the application.

## 🔐 Authentication

To authenticate, send a POST request to the `/auth` endpoint with the user's email:

```json
POST /auth
{
  "email": "user@example.com"
}
```

On success, store the returned JWT token and include it in the `Authorization` header for subsequent API requests:

```json
Authorization: Bearer <JWT_TOKEN>
```

## 📂 Folder Structure

```
BitechX_PM/
├── app/ # Next.js App Router pages & layouts
│ ├── products/ # Product-related pages (list, create, edit, details)
│ │ ├── [slug]/ # Dynamic route for product details
│ │ ├── create/ # Create product page
│ │ └── edit/ # Edit product page
│ ├── categories/ # Category pages (list, search)
│ ├── auth/ # Authentication pages (login)
│ └── layout.js # Root layout for the app
├── redux/ # Redux Toolkit store & slices
│ ├── store.js # Configure store
│ ├── slices/
│ │ ├── authSlice.js # Auth state slice
│ │ ├── productsSlice.js # Products state slice
│ │ └── categoriesSlice.js # Categories state slice
├── components/ # Reusable UI components
│ ├── Navbar.js
│ ├── Sidebar.js
│ ├── ProductCard.js
│ ├── CategoryCard.js
│ └── LoadingSpinner.js
├── utils/ # Helper functions & API calls
│ ├── api.js # API request helpers
│ └── validation.js # Form validation helpers
├── public/ # Static assets (images, icons)
│ ├── preview.png
│ └── logos/
├── styles/ # Tailwind and global styles
│ ├── globals.css
│ └── tailwind.config.js
├── package.json
├── yarn.lock
├── next.config.js
└── README.md
```

## 🧪 Testing

Run tests using your preferred testing framework (e.g., Jest, React Testing Library).

## 🚀 Deployment

For deployment, consider using platforms like Vercel or Netlify. Ensure that environment variables are properly configured in the deployment settings.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
