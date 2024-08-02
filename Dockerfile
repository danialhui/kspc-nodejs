FROM node:22.5.1-alpine

WORKDIR .

COPY index.js package.json package-lock.json ./
COPY service/ ./service/
RUN npm install 
CMD ["npm", "start", "run-object-sorter"]
