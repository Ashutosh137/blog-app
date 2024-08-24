FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV NEXT_PUBLIC_BACKEND_URL="https://overflowing-ambition-production.up.railway.app/"

EXPOSE 3000

CMD ["npm", "run", "start"]