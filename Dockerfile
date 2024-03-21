FROM node:lts-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD ["node", "index.js"]


#commands
# 
# docker build -t deviceai5554/node-api .
# docker images
# docker run --name node-api -p 3000:3000 -d deviceai5554/node-api
# docker ps
# docker stop d45gty67hg