# react-bun-tanstack-expense-tracker

## Developed an Expense tracker application with the UI developed using ReactJS and the Backend using Bun & Hono, utilizing Tansatck Query and Router to make the date fetching and page routing much faster and seamless

### This application's architecture hosts both the front-end and the back-end from the same directory instead of having the codebase in separate folders.

### Vite's proxy is utilized here to make it seem like both the front-end and back-end are hosted under the same domain, localhost:5173. By proxying the requests to the backend hosted under localhost:3000 to go through localhost:5173, where the UI is hosted, this makes it seem as if the request and response are to and from the same domain, which prevents CORS errors.
