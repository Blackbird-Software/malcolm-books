FROM node:latest

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . /opt/app

# Install dependencies
COPY package.json .
RUN yarn install

# Bundle app source
COPY . .

# Exports
EXPOSE 3000
CMD [ "yarn", "run", "start:dev" ]