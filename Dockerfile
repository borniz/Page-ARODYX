FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration production

# Etapa 2: Servidor Node.js para Angular SSR en producción
FROM node:20-alpine
WORKDIR /app
# Copiamos la estructura exacta generada en dist/frontend
COPY --from=build /app/dist/frontend ./dist/frontend

EXPOSE 4000
# Comando exacto para arrancar el servidor SSR con tu archivo server.mjs
CMD ["node", "dist/frontend/server/server.mjs"]