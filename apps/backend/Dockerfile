FROM node:20-alpine AS node
WORKDIR /app

FROM node AS base
ENV PNPM_HOME=/pnpm
ENV CI=true
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install --global corepack@latest
RUN corepack enable pnpm
RUN pnpm add -g turbo

FROM base AS builder
COPY . .
RUN turbo prune asset-price-checker-api --docker

FROM base AS installer
RUN apk add --update --no-cache make g++ python3 && ln -sf python3 /usr/bin/python
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=...asset-price-checker-api

RUN pnpm prune --prod
RUN pnpm install --filter=asset-price-checker-api... --prod --frozen-lockfile

FROM node AS runner
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nest
USER nest

COPY --from=installer --chown=nest:nodejs /app/apps/backend/dist ./apps/backend/dist
COPY --from=installer --chown=nest:nodejs /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer --chown=nest:nodejs /app/apps/backend/package.json ./apps/backend/package.json

COPY --from=installer --chown=nest:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nest:nodejs /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=installer --chown=nest:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nest:nodejs /app/turbo.json ./turbo.json

EXPOSE 3000

CMD ["node", "apps/backend/dist/main.js"]