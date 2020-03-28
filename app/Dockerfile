FROM jrottenberg/ffmpeg:4.1-alpine

COPY ./ /app

WORKDIR /app

RUN adduser -D -u 1000 node && \
    apk add --no-cache libstdc++ && \
    apk add --no-cache --virtual --update nodejs nodejs-npm && \
    npm install --production

ENTRYPOINT []

EXPOSE 3000

CMD ["npm", "start"]