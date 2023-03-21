# Base image with Node.js 14.17.3
FROM node:14.17.3

# Install curl
RUN apt-get update && apt-get install -y nodejs
RUN npm install -g @angular/cli


# Install NVM
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Load nvm
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && \
    nvm install 14 && \
    nvm use 14

# Set environment variables for NVM
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 14.17.3

# Load NVM
RUN . "$NVM_DIR/nvm.sh" && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION

# Install Angular CLI, rxjs, and rxjs-compat globally
RUN . "$NVM_DIR/nvm.sh" && \
    npm install -g @angular/cli && \
    npm install -g rxjs && \
    npm install -g rxjs-compat

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN . "$NVM_DIR/nvm.sh" && \
    npm install

# Copy the source code
COPY constructionopsFE/src/ /app/src/constructionopsFE

# Build the Angular application
RUN . "$NVM_DIR/nvm.sh"
RUN ng build --output-hashing=all
# Set the command to run when the container starts
CMD ["npm", "start"]
