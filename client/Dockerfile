
FROM node:22-alpine as builder 
# the builder like a variable that we can use to copy the build files from the builder stage to the nginx html directory
#  create a working directory in the container
WORKDIR /client  
COPY package*.json ./
RUN npm install
#  copy all the files from the current directory to the working directory in the container
COPY . .
RUN npm run build
#get new image from nginx:alpine and copy the build files from the builder stage to the nginx html directory
FROM nginx:alpine
COPY --from=builder /client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


