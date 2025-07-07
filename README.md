# Atask: GitHub Repository Explorer

A minimal GitHub repository explorer built with Next.js, integrated with GitHub's GraphQL API and tested using Playwright.

## Demo

[sample-atask-react.digachandra.com](https://sample-atask-react.digachandra.com/)

## Screenshots

| Initial                                     | Success                                     |
| ------------------------------------------- | ------------------------------------------- |
| ![Initial](./screenshots/initial-state.png) | ![Success](./screenshots/success-state.png) |

| Not Found                                       | Error                                   |
| ----------------------------------------------- | --------------------------------------- |
| ![Not Found](./screenshots/not-found-state.png) | ![Error](./screenshots/error-state.png) |

## Features Roadmap

- [x] Search GitHub users and display their public repositories
- [x] Integrated with GitHub GraphQL API
- [x] End-to-end (E2E) testing with Playwright
- [ ] Improve SEO and metadata
- [ ] Add Progressive Web App (PWA) support
- [ ] Complete unit testing suite
- [ ] Add error logging

## Getting Started

### Local Development

```bash
npm install
npm run dev
# Open your browser at http://localhost:3000
```

### Running Tests

```bash
npx playwright test
```

## Author

Built by [digachandra](https://www.digachandra.com/).  
Version: 1.0
