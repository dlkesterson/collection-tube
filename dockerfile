FROM node:12
ENV PORT 3000

WORKDIR /mnt/c/Code/ytdl-gui-v2

COPY package*.json ./

RUN npm install

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"