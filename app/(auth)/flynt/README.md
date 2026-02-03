# Flynt

Flynt is a personal finance management application designed to help users track their expenses, manage budgets, and gain insights into their financial habits. This project aims to provide a seamless onboarding experience for new users, allowing them to connect their financial cards and synchronize their data effortlessly.

## Features

- **Dashboard**: A comprehensive overview of the user's financial status, including transactions, budgets, debts, and insights.
- **Onboarding Process**: A guided setup for new users to connect their financial cards and start tracking their finances.
- **Synchronization**: A detailed syncing animation that provides visual feedback during the card connection process, ensuring users are informed about the status of their data synchronization.
- **Theme Toggle**: Users can switch between light and dark themes for a personalized experience.

## Project Structure

```
flynt
├── app
│   ├── dashboard
│   │   └── layout.tsx
│   ├── onboarding
│   │   ├── page.tsx
│   │   ├── connect-card
│   │   │   └── page.tsx
│   │   └── success
│   │       └── page.tsx
├── components
│   ├── SyncAnimation.tsx
│   ├── SyncProgress.tsx
│   └── ThemeToggle.tsx
├── hooks
│   └── useSync.ts
├── lib
│   └── sync.ts
├── styles
│   └── sync.css
├── tests
│   └── SyncProgress.test.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

To get started with Flynt, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd flynt
npm install
```

## Usage

To run the application, use the following command:

```bash
npm run dev
```

This will start the development server, and you can access the application at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.