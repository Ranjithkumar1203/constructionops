# # Base image with Node.js 14.17.3
# FROM node:14.17.3

# # Install curl
# RUN apt-get update && apt-get install -y nodejs
# RUN npm install -g @angular/cli
# RUN npm install

# # Install NVM
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# # Load nvm
# ENV NVM_DIR=/root/.nvm
# RUN . "$NVM_DIR/nvm.sh" && \
#     nvm install 14 && \
#     nvm use 14

# # Set environment variables for NVM
# ENV NVM_DIR /root/.nvm
# ENV NODE_VERSION 14.17.3

# # Load NVM
# RUN . "$NVM_DIR/nvm.sh" && \
#     nvm install $NODE_VERSION && \
#     nvm alias default $NODE_VERSION

# # Install Angular CLI, rxjs, and rxjs-compat globally
# RUN . "$NVM_DIR/nvm.sh" && \
#     npm install -g @angular/cli && \
#     npm install -g rxjs && \
#     npm install -g rxjs-compat

# # Set the working directory to /app
# WORKDIR /app

# # # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install dependencies
# RUN . "$NVM_DIR/nvm.sh" && \
#     npm install

# # Copy the source code
# COPY constructionopsFE/src/ /app/src/constructionopsFE

# # Build the Angular application
# RUN . "$NVM_DIR/nvm.sh"
# RUN ng build --output-hashing=all
# # Set the command to run when the container starts
# CMD ["npm", "start"]


# FROM node:14

# # set the working directory in the container
# WORKDIR /app

# # Copy the package.json and package-lock.json files
# COPY package*.json ./

# # Install npm packages
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash \
#     && export NVM_DIR="$HOME/.nvm" \
#     && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
#     && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" \
#     && nvm use 14 \
#     && npm install -g @angular/cli \
#     && npm install rxjs \
#     && npm install rxjs-compat \
#     && npm i --only=dev \
#     && ng build --output-hashing=all

# # Copy the application files to the container
# COPY . .

# # Expose the port that the container will listen on
# EXPOSE 4200

# # Start the application
# CMD ["npm", "start"]

FROM node:14

# Install curl for nvm installation
RUN apt-get update && apt-get install -y curl

# Install nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Set NVM environment variables
ENV NVM_DIR=/root/.nvm
RUN . $NVM_DIR/nvm.sh && \
    nvm install 14 && \
    nvm alias default 14 && \
    nvm use default

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY constructionopsFE/src/ /app/src/constructionopsFE

# Build the app
RUN ng build --output-hashing=all

# Start the app
CMD [ "npm", "start" ]


