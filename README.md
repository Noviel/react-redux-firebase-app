#react-redux-firebase-app

## bI?
Simple application built with react, redux and firebase. 
Based on [osnova-react-environment](https://github.com/Noviel/osnova-react-environment).

Live [demo on heroku](https://react-redux-firebase-app.herokuapp.com).
## Features

 - ES6+ support
 - Building either a client and a server with transparently configured Webpack
 - Linting on the build stage that enforces best code writing practices
 - Server side rendering with Webpack-React-Redux stack
 
## Components 

[osnova-react-environment](https://github.com/Noviel/osnova-react-environment#components) components and:

 - [firebase](https://www.npmjs.com/package/firebase)
 
## Installation

### Via git:

    git clone git@github.com:Noviel/react-redux-firebase-app.git <your-application-name>
    
### Or download:

    https://github.com/Noviel/react-redux-firebase-app/archive/master.zip
    
## Prepare
- Go to `<your-application-name>` root directory.
- Delete `.git` directory.
- Set in `package.json` information about your application.
- `npm install` or `yarn install` for dependencies.

Note that build folders are excluded from git. You need to
remove `/server` and `/static/dist` from `.gitignore` to push built version.

## Launching

```sh
npm run build
npm run start
start http://localhost:3322
```