## NOTE:
  # Dockerfile essentially contains the build instructions to build the image.

  # we can simply build this front-end with this command:
    # docker build -t react-app .

# Dockerfile for React client

# Build react client
FROM node:14-slim

# Working directory be app
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

# installing dependencies

RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

