# Frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Steps to run Frontend:
1. Go to frontend folder: `cd frontend`
1. Install dependencies: `npm install`
3. Start the server: `npm run start`


### How to Send API Requests from Frontend:
1. Define the backend API route in `src/apiRoutes.js`. Add the route to `apiRoutes` object in same file.
2. Import `apiRoutes` in components using `import apiRoutes from '../apiRoutes';`
3. Use `apiRoutes.<route-name>` for sending requests.