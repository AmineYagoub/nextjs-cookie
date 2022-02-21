FROM node:14-buster-slim as base

WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:14-buster-slim AS builder

WORKDIR /app
COPY . .
COPY --from=base /app/node_modules ./node_modules
RUN yarn build


# Production image, copy all the files and run next
FROM node:14-buster-slim AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

RUN yarn install --production --ignore-scripts --prefer-offline

# USER nest

EXPOSE 3000

CMD ["yarn", "start:prod"]