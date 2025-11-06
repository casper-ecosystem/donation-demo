FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# ⬇️ compile TypeScript before running
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
