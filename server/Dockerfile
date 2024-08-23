FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 4000:4000

# Define the command to run the app
CMD ["npm", "start"]
