# Instituição Financeira DimDim - Projeto DimDimApp
Equipe: Liga dos vilões
ADMIN_PASSWORD="Fiap@2tdsvms"

## Tecnologias Utilizadas
- **Aplicação (API):** Node.js com Express
- **Banco de Dados:** PostgreSQL
- **Infraestrutura:** Docker e Docker Compose

## Pré-requisitos
- Ter o **Docker** e o **Docker Compose** instalados na sua máquina (ou ambiente em nuvem).
- Ter o **Git** instalado.

---

## How to (Instruções de Execução)

Siga os passos abaixo para executar a aplicação desde o clone até os testes:

### Passo 1: Clonar o Repositório
No terminal, digite o seguinte comando para clonar o projeto:
```bash
git clone https://github.com/LeandroGuaridoOliveira/cp3-docker.git 
cd dimdim-app
```
*(Nota: Lembre-se de dar um `git init` na pasta `dimdim-app` e subir para o seu GitHub antes de gravar o vídeo).*

### Passo 2: Subir os Containers
Utilizando o Docker Compose, os dois containers (Banco de Dados e Aplicação) subirão simultaneamente em background e conectados na mesma rede. O banco de dados usará um volume nomeado para garantir a persistência.

Execute:
```bash
docker-compose up -d --build
```
Isso fará com que:
1. A rede `dimdim_network_rm561760` seja criada.
2. O volume nomeado `pgdata_rm561760` seja criado para persistência.
3. O container do banco `db_rm561760` inicie e crie a tabela `contas` com dados iniciais.
4. A imagem da aplicação Node seja construída a partir do `Dockerfile`.
5. O container da aplicação `app_rm561760` inicie e fique escutando na porta `3000`.

### Passo 3: Validar e Demonstrar no Terminal
De acordo com os requisitos obrigatórios, você deve acessar os containers pelo terminal e demonstrar estrutura e usuário.

**Acessando a Aplicação:**
```bash
docker container exec -it app_rm561760 sh
# Estando dentro do container, execute:
pwd      # Deve retornar /usr/src/app (nosso diretório de trabalho)
ls       # Para listar os arquivos da aplicação
whoami   # Deve retornar 'dimdimuser' (usuário não-root que definimos no Dockerfile)
exit     # Para sair
```

**Acessando o Banco de Dados:**
```bash
docker container exec -it db_rm561760 bash
# Estando dentro do container, execute:
pwd
ls
whoami   # Deve retornar 'postgres'
exit     # Para sair
```

### Passo 4: Evidências do CRUD e Banco de Dados (Postman / cURL e SQL)

**1. READ (Buscar contas no banco de dados) via API:**
Abra seu navegador, Postman ou use o terminal:
```bash
curl http://<IP_DA_SUA_VM>:3000/contas
```

**2. CREATE (Criar uma nova conta) via API:**
```bash
curl -X POST -H "Content-Type: application/json" -d '{"titular": "Novo Cliente", "saldo": 500.00}' http://<IP_DA_SUA_VM>:3000/contas
```

**3. UPDATE (Atualizar saldo) via API:**
*(Supondo que o ID da conta do Leandro seja 1)*
```bash
curl -X PUT -H "Content-Type: application/json" -d '{"saldo": 2000.00}' http://<IP_DA_SUA_VM>:3000/contas/1
```

**4. DELETE (Deletar conta) via API:**
*(Supondo que o ID da conta do Kaiky seja 3)*
```bash
curl -X DELETE http://<IP_DA_SUA_VM>:3000/contas/3
```

**Evidência no Banco de Dados (CRÍTICO: não esqueça de fazer isso no vídeo):**
Conecte-se ao banco de dados para fazer um SELECT diretamente e provar a persistência:
```bash
docker container exec -it db_rm561760 psql -U postgres -d dimdim

# No prompt do banco de dados (dimdim=#), digite:
SELECT * FROM contas;
\q
```
*Isto irá listar todas as contas, mostrando os reflexos das operações da API diretamente na tabela do PostgreSQL.*

### Passo 5: Desligar o ambiente (opcional)
```bash
docker-compose down
```
*(Se ligar de novo depois, os dados estarão lá, pois usamos Volume Nomeado).*
