# Features already Added

- Cloud Database
- Email OTP verification
- JWT Secret Code

## Installation and Setup

Open root folder in vscode or any other editor:

```bash
  npm install
  npm run dev
```

## API's end points

- for signup

```bash
  HTTP Method - POST
  URL - localhost:5000/api/auth/signup
  body-
  {
  "name": "",
  "email": "",
  "password": ""
  }
```

- for login

```bash
  HTTP Method - POST
  URL - localhost:5000/api/auth/login
  body-
  {
  "email": "",
  "password": ""
  }
```

- for forget password

```bash
  HTTP Method - POST
  URL - localhost:5000/api/auth/forget
  body-
  {
  "email": ""
  }
```

- for reset password

```bash
  HTTP Method - POST
  URL - localhost:5000/api/auth/resetPassword
  body-
  {
  "otp": "",
  "password": "",
  "confirmPassword": "",
  "email": ""
  }
```
