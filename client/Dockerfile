# Build Stage

FROM  node:18-alpine AS builder
WORKDIR /frontend

COPY package*.json ./

RUN npm install 
COPY . . 


RUN npm run build 

#  Production Stage
FROM nginx:alpine 
COPY --from=builder /frontend/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx"  , "-g" ,"daemon off;"]