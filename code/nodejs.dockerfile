FROM node:18-alpine

# Créer un répertoire de travail
WORKDIR /home/node/app

# Copiez package.json et installez les dépendances
COPY package*.json ./
RUN npm install

# Copiez l'intégralité du projet à l'intérieur du conteneur
COPY . .

# Ouvrir le port
EXPOSE 9999

# Démarrer le serveur
CMD ["npm", "start"]
