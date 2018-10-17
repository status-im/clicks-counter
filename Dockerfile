FROM node:8.12-slim

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY dist/ ./

ENV REDIS_HOST=localhost \
    REDIS_PORT=6379 \
    LISTEN_PORT=3000

LABEL source="https://github.com/status-im/clicks-counter" \
      description="Basic NodeJS API for counting clicks." \
      maintainer="jakub@status.im"

CMD ["npm", "start"]
EXPOSE $LISTEN_PORT
