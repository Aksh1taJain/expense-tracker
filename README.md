# BudgetWise Expense Tracker

A production-ready React + Firebase expense tracker with authentication, per-user Firestore data isolation, transaction management, monthly budgets, Chart.js analytics, CSV export, and PDF financial reports.

## Features

- Firebase email/password registration, login, logout, and persistent sessions
- Protected routes and authenticated app shell
- Dashboard cards for income, expenses, balance, savings, and highest spending category
- Firestore CRUD for transactions and budgets scoped by `userId`
- Filters for transaction type, category, month, and note search
- Budget progress bars with 80% warnings and exceeded alerts
- Bar, pie, and line charts powered by live Firestore data
- Monthly reports with category breakdown, largest expense, savings summary, and month-over-month insight
- CSV transaction export and jsPDF monthly report export
- Responsive Tailwind CSS interface with empty/loading states and toast notifications

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

Create a Firebase project, enable Email/Password Authentication, create a Firestore database, and paste your web app config into `.env`.

## Firestore Collections

### `transactions`

```js
{
  userId: string,
  type: 'income' | 'expense',
  amount: number,
  category: string,
  date: string,
  note: string,
  createdAt: timestamp
}
```

### `budgets`

```js
{
  userId: string,
  category: string,
  limit: number,
  month: string
}
```

### `users`

Created during registration with the user's name, email, and server timestamp.

## Recommended Firestore Rules

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /transactions/{document} {
      allow read, create, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    match /budgets/{document} {
      allow read, create, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

Firestore may prompt you to create composite indexes for queries combining `userId` and `date`/`month` ordering. Follow the Firebase console link from the error message if needed.
