# On part d'une image existante
FROM node:20

# Repertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie de package.json et package-lock.json dans le conteneur
COPY ./package.json ./package-lock.json ./

# On lance NPM pour l'installation des dépendances
RUN npm i

# Copie du code dans le conteneur
COPY . .

# Rebuilde l'output.css
RUN npx tailwindcss -i /usr/src/app/src/assets/css/style.css -o /usr/src/app/src/assets/css/output.css

# On expose le port 3000
EXPOSE 3000

# On lance l'application
CMD [ "npm", "start" ]