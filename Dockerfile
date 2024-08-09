FROM node:22.4-alpine3.19

WORKDIR /usr/src/app

RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.19/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.19/community" >> /etc/apk/repositories \
    && apk update \
    && apk upgrade \
    && apk add -q --update --progress --no-cache bash coreutils curl \
    docker-cli docker-compose g++ git jq make ncurses openssh-client py3-pip python3 sudo \
    vim vim-doc


COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/src/main.js"]