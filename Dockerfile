FROM node:14-alpine

WORKDIR /app

COPY package.json ./
RUN yarn install --production

COPY dist/ ./

ENV REDIS_HOST=localhost \
    REDIS_PORT=6379 \
    LISTEN_PORT=3000

LABEL source="https://github.com/status-im/clicks-counter" \
      description="Basic NodeJS API for counting clicks." \
      maintainer="jakub@status.im"

CMD ["npm", "start"]
EXPOSE $LISTEN_PORT
