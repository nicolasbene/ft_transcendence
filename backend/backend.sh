#!/bin/sh

npm install
npx prisma generate

echo "-----Migrating database-----"

npx prisma migrate deploy

echo "-----Starting Prisma Studio on port 5555-----"

npx prisma studio --port 5555 &

echo "-----Starting backend-----"

npm run start:dev
