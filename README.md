Social Media App

> Social Media WebApp built with ReactJS and GraphQL

![screenshot](https://github.com/siddharthroy12/socialy/blob/main/client/public/img/screenshot.png)

## Live Site
[https://solialy.herokuapp.com/](https://solialy.herokuapp.com/)

## Features

- Authentication and Authorization
- Post, Likes and Comments
- Profile Page with Posts
- Recent Posts Page

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
DB_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
yarn install
cd client
yarn install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
yarn run dev

# Run backend only
yarn run server

# Run client only
yarn run client
```

## Build & Deploy

```
# Create frontend production build
cd frontend
yarn run build
```

There is a Heroku postbuild script available for Heroku
