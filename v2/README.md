# LAUT- Southeast Asian Restaurant Web App

A full-stack MERN application for a Southeast Asian restaurant. It includes a public site (menu, gallery, contact), reservations, user authentication, profile management (with avatar upload), social sharing, a newsletter subscribe form, and admin-friendly email + data capture for contact messages.

------------------------------------------------------------------------

## Features:
- Public pages: Home, Menu, About, Gallery (modal lightbox w/ share buttons), Contact

- Reservations: Client form with validation; server slot capacity checks; “My reservations” list in profile

- Auth: Register/Login with hashed passwords, JWT in HttpOnly cookie, logout

- Profile: View & edit profile, change password, template avatar picker or image upload

- Contact form: Sends an email via SMTP (supports Mailtrap for dev) and stores the message in MongoDB

- Newsletter subscribe: Minimal email capture with success message styling

- Nice DX helpers: apiFetch wrapper (fetch + cookies + JSON), useForm hook (validation + submit)

------------------------------------------------------------------------

## Tech Stack:

- Frontend: React (CRA), React Router, Font Awesome

- Backend: Node.js, Express, Mongoose (MongoDB)

- Auth: JWT (HttpOnly cookie)

- Email: Nodemailer (SMTP/Mailtrap)

- Uploads: Multer (store under /uploads and serve statically)

- Tooling: Nodemon, Morgan, Cookie-Parser, CORS

------------------------------------------------------------------------

## Prerequisites:

- Node 18+ (Node 20+ recommended)

- MongoDB Atlas connection string

- (Dev email) Mailtrap credentials, or any SMTP account

------------------------------------------------------------------------

## Install and Run:

1) Open a terminal
2) Run: (cd server) + (npm install) + (npm run dev)/(node src/index.js)
3) On success: Should receive the following messages
	- MongoDB connected
	- Server listening on 5000
4) Open a NEW terminal
5) Run: (cd client) + (npm install) + (npm start)
6) on success: the web app should launch on a new tab on your browser. 

------------------------------------------------------------------------

### API Overview

Base URL during dev: http://localhost:5000/api

Auth

POST /auth/register — { fullName, username, email, password, phone? }

POST /auth/login — { usernameOrEmail, password }
Sets token cookie (HttpOnly). Returns minimal user data.

POST /auth/logout — clears cookie

Users (auth required)

GET /users/me — returns current user profile

PUT /users/me — update profile

Accepts JSON: { fullName, username, email, phone, avatarTemplate? }

Or multipart/form-data with avatar (file)

PUT /users/me/password — { current, next }

Reservations

POST /reservations — create reservation
{ name, email?, phone, date, time, seats, notes? }
Responds 409 with { available } if slot capacity hit.

GET /reservations/mine — current user’s reservations (requires auth)

Contact

POST /contact — { name, email, message }
Sends an email via SMTP and stores the message in MongoDB.

Health

GET /health — { ok: true }

------------------------------------------------------------------------

### Frontend Notes

apiFetch(path, options)

Prefixes /api, sets credentials: "include", JSON enc/dec, throws on non-2xx with .status and .data.

Automatically handles FormData bodies.

useForm({ initial, validate, onSubmit })

Local state for values/errors/submitting

handleChange, handleSubmit, and helpers

Forms using these helpers

RegisterSection, LoginForm, ReservationsForm, ContactForm, SubscribeForm

ProfileSection for profile + password + avatar (file/template)

Reservation history is rendered in ProfileSection via GET /reservations/mine

Gallery Share Buttons

Facebook/X open share URLs in a new tab

Instagram can’t prefill posts; we copy the page URL to clipboard and open Instagram login

------------------------------------------------------------------------

### Email Setup (Using Mailtrap)

1) Create a free Mailtrap account.

2) Copy SMTP credentials into .env (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE=false).

3) Submit the contact form; messages appear in your Mailtrap inbox.

------------------------------------------------------------------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
