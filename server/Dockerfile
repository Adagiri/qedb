# Install dependencies only when needed
FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 9000

CMD ["npm", "start"]

# build command
# sudo docker build --build-arg NEXT_PUBLIC_BACKEND_API_URL=https://server.qedb.net -t qedb-admin ./admin
