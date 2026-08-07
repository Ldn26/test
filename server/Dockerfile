FROM node:22-alpine
WORKDIR /server
COPY package*.json ./

RUN npm install --omit=dev

COPY . .

ENV PORT=4000
ENV DATABASE_URL=postgresql://postgres.dsftuzjmgaalxfxjavuv:Sobhanallah2004@@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
ENV JWT_SECRET=your_jwt_secret_key
ENV REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
ENV NODE_ENV=development

EXPOSE 4000

CMD ["node", "server.js"]   