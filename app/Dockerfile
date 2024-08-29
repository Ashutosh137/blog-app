FROM node:20-alpine

WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=https://overflowing-ambition-production.up.railway.app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]