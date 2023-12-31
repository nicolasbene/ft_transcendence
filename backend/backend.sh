#!/bin/sh

npm install
npm i --save class-validator class-transformer
npm add argon2

npx prisma generate

echo "-----Migrating database-----"

npx prisma db push

echo "-----Starting Prisma Studio on port 5555-----"

npx prisma studio --port 5555 &

echo "-----Starting backend-----"

npm run start:dev
