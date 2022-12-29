# Blog MERN

A blog website where the admin can create blogs with markdown, edit, delete and publish them. The user can view the blogs and comment on them

> This was an assignment project from [the Odin Project](https://www.theodinproject.com/lessons/nodejs-blog-api). It is part of the full stack API section of their course.

## Live Demo

[Blog API](https://blog-mern-client.onrender.com/)

## Test the app locally on your machine

- Clone the repo and `cd` into the project directory
- Add a _.env_ file in the root directory with the following variables:

```dotenv
MONGO_URI='YOUR_MONGODB_URI'
SECRET='ANY_SECRET_KEY'
PORT=4000
```

- Run:

```bash
cd backend
yarn install
yarn start
```

- Open a new terminal and run:

```bash
cd client
yarn install
yarn start
```

NOTE: Remember to comment and uncomment all urls that points to production (render url) and development (localhost) in client package.json (proxy), all context files, and all api calls in the client as well as server.js in the backend.

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
