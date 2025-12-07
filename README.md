# KYC (Know Your Customer) Application

# Deployment: https://kyc-swart.vercel.app

## Requirements met:
    - Application Logic: Input validation, navigation, rbac,...
    - Technical:
        - use DummyJSON api
        - zustand for state management
        - linting and formating
        - unit tests for reused component
        - deploy to vercel ( no script instruction )
        - code spliting and lazy loading

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

### Running Tests
```bash
npm run test           # Run tests
npm run test:ui        # Run tests with UI
npm run test:coverage  # Generate coverage report
```

## 🔒 Security Features
- JWT-based authentication
- Role-based authorization
- Protected API routes
- Secure token storage with persistence
- Form validation with React Hook Form
