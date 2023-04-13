#!/bin/zsh

pnpm prisma generate
pnpm prisma db push
pnpm run db-seed
pnpm prisma studio