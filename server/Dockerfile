FROM node:22.21.0-alpine
WORKDIR /backend
COPY yarn.lock package.json ./
RUN yarn setup
COPY ./ ./
EXPOSE 5000
CMD ["yarn", "dev"]
