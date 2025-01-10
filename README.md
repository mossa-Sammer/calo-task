# Calo's Task

## Setup the application

from the root directory run
`npm run setup`, this script will install packages in both server and client directories.

**Create a .env file in the server directory, add your Unsplash Client id:**

```
UNSPLASH_ACCESS_KEY=your-key
```

To run the server

```
cd ./server && npm run dev
```

If it ran successfully, it should show

```
Server is running on port 3000
```

Now to run the client, open another terminal window and run:

```
cd ./client && npm run dev
```

## Shared Types:

To avoid duplicating types in both client and server, types are placed in **./types** directory.

## Server Section:

Main Framework used: **Express.js**

For high load on writing jobs, we want to avoid race conditions in the case of the server is adding/updating a job, a function like writeFileSync from the Node.js API will block the event loop, and writeFile promise based function may cause race conditions because we are writing to a file, **async-mutex** package used in the application solves this by locking just this part of code excution, so the event loop can serve other requests and keep data in sync in the same time without any blocking.

<ins>Time Spent in the server implementation: 4 hours.<ins>

## Client Section:

Main Framework used: **React.js**

Template used: **vite-typescript-react**

Main Packages used:

- **react-query**: to fetch/add jobs, keeping the UI on sync with refresh interval option, and handling unstable connections with retry options found in the query client options, main.tsx file.

- **react-hot-toast**: To show the status of adding a job to the user (success or fail).

<ins>Time Spent in the client implementation: 2 hours.<ins>
