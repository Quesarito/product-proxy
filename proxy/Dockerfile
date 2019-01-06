# What image do you want to start building on?
FROM node:8.12

# Make a folder in your image where your app's source code can live
RUN mkdir -p /src/app

# Tell your container where your app's source code will live
WORKDIR /src/app

# What source code do you what to copy, and where to put it?
COPY . /src/app

RUN npm install

EXPOSE 3000

# How do you start your app?
CMD [ "npm", "run", "start" ]