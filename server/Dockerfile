FROM node:18-alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 4000

ENV MONGODBURL="mongodb+srv://mrluckysharma:hDMiiv5arIFFbLxD@cluster0.aoxsc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
ENV JWT_SECRET="JWT_SECRET_NO_ONE_CAN_SEE"

CMD ["npm", "start"]
