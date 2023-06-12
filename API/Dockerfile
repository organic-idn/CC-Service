# Use the official Node image.
# https://hub.docker.com/_/node
FROM node:16

WORKDIR /home/syifakush/CC-Service/API

# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN npm install 

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD ["npm","run", "start-prod"]