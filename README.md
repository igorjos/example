# example
An example task for querying the prog files

Project contains both server code and frontend code, which is for example purposes only.
Best practice is to keep them in separated repositories.

# install
Run `npm install` to install the necessary packages for node

# run
Run `npm start` to run a the server with pre-built frontend locally.

-- Before running the server, make sure you have the `.env` file set in the root folder.
## example .env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0
API_KEY=rYQr6M7Ncs0YUS7yBU1ugQ==
FILES_PATH=files

# rebuild
To run a rebuild of the frontend go to `ui` folder, then run `npm install` first, then `npm run build`.
This will create a new build of the frontend and place it under `src/public` folder of the server.

# TODO
Need to add `build` script for server to convert & pack all TS files to JS.