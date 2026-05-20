# Use uma imagem oficial do Node.js (versão Alpine para ser mais leve)
FROM node:18-alpine

# Define variável de ambiente (requisito 03)
ENV PORT=3000

# Cria um grupo e um usuário não-root chamado "dimdimuser" (requisito 03)
RUN addgroup -S dimgroup && adduser -S dimdimuser -G dimgroup

# Define o diretório de trabalho (requisito 03)
WORKDIR /usr/src/app

# Copia os arquivos de configuração do npm
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Altera a propriedade dos arquivos para o usuário não-root
RUN chown -R dimdimuser:dimgroup /usr/src/app

# Define o usuário não-root para rodar a aplicação a partir daqui (requisito 03)
USER dimdimuser

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
