# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /frontend

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.0 -g
# add app
COPY . ./

# start app
CMD ["npm", "start"]