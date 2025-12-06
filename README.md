# KYC (Know Your Customer) Application

# Deployment: https://kyc-swart.vercel.app

A modern React-based web application for managing customer Know Your Customer (KYC) information and profiles, built with TypeScript and cutting-edge web technologies.

## 🚀 Tech Stack

- **Frontend Framework:** React 19.2 with TypeScript
- **Build Tool:** Vite 7.2
- **Routing:** React Router DOM v7.9
- **State Management:** Zustand 5.0 (with localStorage persistence)
- **Data Fetching:** TanStack React Query v5.90
- **Forms:** React Hook Form 7.66
- **Styling:** Tailwind CSS 4.1
- **Testing:** Vitest 4.0 with Testing Library
- **Notifications:** React Toastify
- **Icons:** React Icons

## 📋 Features

### Authentication & Authorization
- Secure login system with JWT token management
- Role-based access control (admin, moderator, user)
- Protected routes with automatic redirection
- Persistent authentication state

### Profile Management
- **Basic Information:** Edit personal details (name, DOB, nationality, etc.)
- **Contact Details:** Manage multiple emails and phone numbers with type classification
- **Addresses:** Add and edit multiple addresses (residential, mailing, etc.)
- **Identification:** Store and manage identification documents
- **Employment:** Track occupation and employment details
- Preferred contact method selection

### KYC Information Management
- **Income Tracking:** Record and manage multiple income sources
- **Assets Management:** Document various asset types and values
- **Liabilities:** Track debts and financial obligations
- **Source of Wealth:** Document wealth sources and origins
- **Investment Experience:** Record investment history and expertise levels

### Officer Features (Admin/Moderator Only)
- **Preview Page:** Review submitted KYC information
- **Results Page:** Manage and process KYC application outcomes
- Role-restricted access to sensitive operations

## 🏗️ Architecture

### Project Structure
```
KYC/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   ├── modal/
│   │   ├── select/
│   │   └── ...
│   ├── pages/
│   │   ├── shared/        # Shared pages (profile, kyc, login)
│   │   ├── officer/       # Officer-only pages
│   │   └── user/          # User-specific pages
│   ├── hooks/             # Custom React hooks
│   │   └── useAuthStore/  # Authentication state management
│   ├── routes/            # Routing configuration
│   ├── base/              # Base configurations
│   │   ├── api-interceptor.config.ts
│   │   ├── query-client.ts
│   │   └── constants.ts
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── scripts/               # Build and utility scripts
```

### Key Design Patterns
- **Component-Based Architecture:** Modular, reusable components with comprehensive test coverage
- **Lazy Loading:** Optimized performance with code splitting
- **Centralized State Management:** Zustand for authentication and feature-specific stores
- **API Interceptor:** Centralized API configuration and error handling
- **Modal Components:** Separate modals for adding and editing different data types

## 🧪 Testing

The project includes comprehensive test coverage:
- Unit tests for all components
- Integration tests for key workflows
- Test utilities configured with Vitest and Testing Library

### Running Tests
```bash
npm run test           # Run tests
npm run test:ui        # Run tests with UI
npm run test:coverage  # Generate coverage report
```

## 🛠️ Development

### Prerequisites
- Node.js (latest LTS version recommended)
- npm or yarn

### Installation
```bash
cd KYC
npm install
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
npm test             # Run tests
```

### Development Server
The development server runs on Vite with Hot Module Replacement (HMR) for instant updates.

## 🔒 Security Features
- JWT-based authentication
- Role-based authorization
- Protected API routes
- Secure token storage with persistence
- Form validation with React Hook Form

## 📱 User Interface
- Responsive design with Tailwind CSS
- Modern, clean UI components
- Accessibility considerations
- Toast notifications for user feedback
- Loading states and error handling

## 🚦 Routes

- `/` - Home page
- `/login` - User login
- `/profile` - User profile management
- `/kyc` - KYC information management
- `/officer/preview` - Officer preview page (admin/moderator only)
- `/officer/results` - Officer results page (admin/moderator only)

## 📝 License

This project is private and not licensed for public use.

## 👥 Contributing

This is a private project. Contact the repository owner for contribution guidelines.
