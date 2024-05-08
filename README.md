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
  HTTP_Method - POST
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
  HTTP_Method - POST
  URL - localhost:5000/api/auth/login
  body-
  {
  "email": "",
  "password": ""
  }
```

- for forget password

```bash
  HTTP_Method - POST
  URL - localhost:5000/api/auth/forget
  body-
  {
  "email": ""
  }
```

- for reset password

```bash
  HTTP_Method - POST
  URL - localhost:5000/api/auth/resetPassword
  body-
  {
  "otp": "",
  "password": "",
  "confirmPassword": "",
  "email": ""
  }
```

- for Creating a Post

```bash
  HTTP_Method - POST
  URL - localhost:5000/api/post
  Header-
  {
    "Authorization": "JWT Token"
  }
  body-
  {
  "title": "",
  "description": "",
  "image": ""
  }
```

- for Get All Posts

```bash
  HTTP_Method - GET
  URL - localhost:5000/api/post
```

- for Get only User's Posts

```bash
  HTTP_Method - GET
  URL - localhost:5000/api/post/userPosts
  Header-
  {
    "Authorization": "JWT Token"
  }
```

- for Updating a Post

```bash
  HTTP_Method - PUT
  URL - localhost:5000/api/post/:postId
  Header-
  {
    "Authorization": "JWT Token"
  }
  body-
  {
  "title": "",
  "description": "",
  "image": ""
  }
```

- for like a Post

```bash
  HTTP_Method - PATCH
  URL - localhost:5000/api/post/like/:postId
  Header-
  {
    "Authorization": "JWT Token"
  }
```

- for Comment on Post

```bash
  HTTP_Method - PATCH
  URL - localhost:5000/api/post/comment/:postId
  Header-
  {
    "Authorization": "JWT Token"
  }
  body-
  {
  "comment": ""
  }
```

- for Delete a Post

```bash
  HTTP_Method - DELETE
  URL - localhost:5000/api/post/:postId
  Header-
  {
    "Authorization": "JWT Token"
  }
```
