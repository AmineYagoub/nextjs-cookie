FROM node:16-buster AS base
RUN apt-get install -y --no-install-recommends git

FROM base AS deps
WORKDIR /app
COPY ui/package.json ./
RUN yarn install --frozen-lockfile
RUN npm install sharp

# Rebuild the source code only when needed
FROM base AS builder
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.


WORKDIR /app
COPY ui/* .
COPY --from=deps /app/node_modules ./node_modules
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.js ./next.config.js

RUN npm install

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]