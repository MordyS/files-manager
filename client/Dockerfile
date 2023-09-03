FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install the Angular CLI globally
RUN npm install -g @angular/cli@14.2.12

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Install application dependencies
RUN npm i

COPY . .


# Expose the port on which the Angular application runs
EXPOSE 4200

# Start the Angular application
CMD ["npm", "start"]