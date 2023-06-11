# Use the official Node image.
# https://hub.docker.com/_/node
FROM node:16

# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN npm ci --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD ["npm","run", "start-prod"]