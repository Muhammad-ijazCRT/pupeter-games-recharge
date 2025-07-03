# Etapa de construcción
FROM node:18.16.1-alpine3.18 AS build

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos del paquete y instala todas las dependencias, incluyendo devDependencies
COPY package*.json ./
RUN npm install

# Instala dependencias y Chrome para la construcción si es necesario
RUN apk update && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

# Copia el resto de tu aplicación
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM node:18.16.1-alpine3.18

# Configura el directorio de trabajo
WORKDIR /app

# Crea un usuario no root y cambia la propiedad de los archivos
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Instala Chromium y dependencias necesarias
RUN apk update && apk add --no-cache \
    udev \
    ttf-freefont \
    chromium

# Establece las variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# Instala solo las dependencias de producción
COPY --from=build /app/package*.json ./
RUN npm install --only=production

# Copia los archivos construidos y necesarios de la etapa anterior
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Cambia la propiedad al usuario no root
RUN chown -R appuser:appgroup /app
USER appuser

# Expone el puerto deseado
EXPOSE 3510

# Configura el comando de inicio
CMD ["node", "dist/main.js"]