# React Test Project [[RU]](https://github.com/andreyDanilenko/react_test/blob/main/README.ru.md)
## React Test Preview [[Beta]](https://lambent-cheesecake-c4626e.netlify.app)

Test assignment: product catalog with authorization, sorting, and cart using DummyJSON API.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🔑 Test Credentials

```
Username: emilys
Password: emilyspass
```

## 📦 Tech Stack

- **React 19** + TypeScript
- **Redux Toolkit** + RTK Query
- **React Router v7**
- **Tailwind CSS v4** + custom design tokens
- **Vite**
- **FSD** (Feature-Sliced Design)

## ⚙️ Functional Requirements

### Login Form
- Field validation (required fields)
- Error handling: display API error messages under fields
- Session persistence:
  - "Remember me" checked → token in localStorage (persists after browser close)
  - "Remember me" unchecked → token in sessionStorage (cleared on tab close)

### Products List
- Table matching Figma design
- Loading progress bar
- Data fetched from DummyJSON API
- Sorting by price and rating (sort state persists)

### Add Product
- Modal form opens on "Add" button click
- Fields: title, price, vendor, SKU
- Toast notification on successful add (mock, no API call)

### Interface Logic
- Products with rating < 3 highlighted in red
- Search products via DummyJSON API

## 🔗 API Endpoints

- Auth: `https://dummyjson.com/auth/login`
- Products: `https://dummyjson.com/products`
- Search: `https://dummyjson.com/products/search?q=...`
