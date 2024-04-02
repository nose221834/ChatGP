FROM node:20.11.1-bookworm-slim AS base

WORKDIR /app

COPY .yarn ./.yarn
COPY .yarnrc.yml ./

RUN yarn set version stable

FROM base AS deps

WORKDIR /app

COPY package.json yarn.lock* .yarnrc.yml ./

RUN \
  if [ -f yarn.lock ]; then yarn; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMENTRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  else echo "Lockfile not found." && exit; \
  fi

FROM base AS runner

WORKDIR /app

ENV NDOE_ENV production

ENV NEXT_TELEMENTRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD HOSTNAME="0.0.0.0" node server.js 
