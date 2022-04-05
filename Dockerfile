FROM node:12.13-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5818
CMD ["npm", "run", "start:prod"]