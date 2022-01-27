FROM node:lts

COPY ./ /app
WORKDIR /app
RUN apt-get update && \
    apt-get upgrade -y && \
    yarn global add @vue/cli && \
    yarn global add @vue/cli-init && \
    yarn build


