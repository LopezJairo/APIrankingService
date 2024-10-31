# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
RUN mkdir -p /home/app

# Copia el resto de los archivos de tu aplicación
COPY . /home/app

# Expone el puerto que tu aplicación está utilizando
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "/home/app/index.js"]
