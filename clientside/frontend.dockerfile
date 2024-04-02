
FROM node:18

WORKDIR /app

# Install Yarn via the official Debian package repository
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null \
    && echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn

COPY package*.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 5000

CMD ["yarn", "start"]

## there is not npm though! 