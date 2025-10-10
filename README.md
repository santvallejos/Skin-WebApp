# Skin web

Skin web is an application e-commerce that allows you to view products and manage your shopping cart, confirming the order by WhatsApp.

# Technologies Used

<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="50" height="50" style="margin: 10px;" alt="React">
  <img src="https://vitejs.dev/logo.svg" alt="Vite" width="50" height="50" style="margin: 10px;" alt="Vite">
  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="TypeScript" width="50" height="50" style="margin: 10px;" alt="TypeScript">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS" width="50" height="50" style="margin: 10px;" alt="Tailwind CSS">
  <img src="https://zustand-demo.pmnd.rs/logo192.png" alt="Zustand" width="50" height="50" style="margin: 10px;" alt="Zustand">
  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" style="margin: 10px;" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#242938" rx="60"/><g clip-path="url(#SVGHONgndwI)"><path fill="url(#SVG0adaVcER)" d="M144.757 223.193c-5.061 6.373-15.323 2.881-15.445-5.257l-1.783-119.029h80.035c14.496 0 22.581 16.744 13.567 28.097z"/><path fill="url(#SVGYSgwBYuL)" fill-opacity="0.2" d="M144.757 223.193c-5.061 6.373-15.323 2.881-15.445-5.257l-1.783-119.029h80.035c14.496 0 22.581 16.744 13.567 28.097z"/><path fill="#3ecf8e" d="M112.207 31.666c5.061-6.375 15.323-2.882 15.445 5.256l.782 119.029H49.4c-14.497 0-22.582-16.744-13.567-28.097z"/></g><defs><linearGradient id="SVG0adaVcER" x1="127.529" x2="198.661" y1="125.299" y2="155.132" gradientUnits="userSpaceOnUse"><stop stop-color="#249361"/><stop offset="1" stop-color="#3ecf8e"/></linearGradient><linearGradient id="SVGYSgwBYuL" x1="95.993" x2="128.433" y1="82.12" y2="143.187" gradientUnits="userSpaceOnUse"><stop/><stop offset="1" stop-opacity="0"/></linearGradient><clipPath id="SVGHONgndwI"><path fill="#fff" d="M32 28h192.92v200H32z"/></clipPath></defs></g></svg>
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="50" height="50" style="margin: 10px;" alt="WhatsApp">
</div>

# ¿What is Skin web app?

Skin web is an e-commerce application that allows users to browse products, manage their shopping cart, and confirm orders via WhatsApp. It provides a seamless shopping experience with a user-friendly interface.

# Principal Characteristics

- **Product Browsing 📦**: Users can view a wide range of products available for purchase.
- **Filtering 🔍**: Users can filter products by categories, price range, and other attributes.
- **Shopping Cart Management 🛒**: Users can add, remove, and update items in their shopping cart.
- **Order Confirmation via WhatsApp 📱**: Users can confirm their orders through WhatsApp for a seamless experience.

# Demo

You Can see a demo of the application [here](https://skincts.vercel.app/).

# Getting Started

To get started with the Skin web application, follow these steps:
1. **Clone the repository**:

```bash
  git clone https://github.com/santvallejos/Skin-WebApp.git
  cd Skin-WebApp
```

2. **Install dependencies**:

```bash
  pnpm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory and add the following variables:

```env
  VITE_GITHUB_TOKEN=***************

  VITE_CAPTCHA_HTML=***************

  VITE_CAPTCHA_PRIVATE=***************

  VITE_API_STATIC_FORMS=***************

  VITE_SUPABASE_URL=***************

  VITE_SUPABASE_ANON_KEY=***************
```

4. **Run the development server**:

```bash
  pnpm run dev
```

# Architecture

```
  Skin-WebApp
  ├── public
  ├── src
  |    ├── assets
  |    ├── components
  |    ├── hooks
  |    ├── lib
  |    ├── mappers
  |    ├── models
  |    ├── pages
  |    ├── services
  |    ├── stores
  |    ├── App.tsx
  |    ├── index.css
  |    ├── Layout.tsx
  |    ├── main.tsx
  |    └── vite-env.d.ts
  ├── dist
  ├── .env
  ├── .gitignore
  ├── components.json
  ├── eslint.config.js
  ├── index.html
  ├── package.json
  ├── package-lock.json
  ├── pnpm-lock.yaml
  ├── Readme.md
  ├── tsconfig.app.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  ├── vercel.json
  └── vite.config.ts
```

# Author
[![Github](https://img.icons8.com/?size=50&id=62856&format=png&color=000000)](https://github.com/santvallejos)
[![LinkedIn Follow](https://img.icons8.com/?size=50&id=447&format=png&color=000000)](https://www.linkedin.com/in/santiago-vallejos-97a933236/)
[![Portfolio](https://img.icons8.com/?size=50&id=3685&format=png&color=000000)](https://santvallejos.dev/)