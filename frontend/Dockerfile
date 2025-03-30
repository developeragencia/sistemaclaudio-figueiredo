FROM node:18-alpine

WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Instalar servidor para produção
RUN npm install -g serve

# Expor a porta
EXPOSE 3000

# Iniciar o servidor
CMD ["serve", "-s", "build", "-l", "3000"] 