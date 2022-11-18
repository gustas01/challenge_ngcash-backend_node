<h2>Tecnologias usadas</h2>
NodeJS, ExpressJS, PostgreSQL, SequelizeORM, bcryptjs, jsonwebtoken.
<hr>

# Instruções para a execução do projeto.
OBS: O NodeJS e o PostgresSQL devem estar instalados no ambiente onde será executado o projeto.

1° passo - Com o PostgresSQL em execução, crie um banco onde serão salvas as informações referentes aos usuários.

2° passo - Crie um arquivo com o nome `.env`na raiz da aplicação e insira o conteúdo abaixo.

```bash
# o nome do banco que usará para salvar os dados (criado no passo anterior)
DATABASE=

# a porta onde seu banco está ounvido as requisições
DATABASE_PORT=

# o nome do usuário do banco de dados
DATABASE_USERNAME=

# a senha do banco de dados
DATABASE_PASSWORD=

# vários caracteres aleatórios para que o bcryptjs possa gerar o hash a partir da senha do usuário.
TOKEN_SECRET=

# tempo de expiração do token do usuário (exemplos: 7d, 24h; para 7 dias e 24 horas respectivamente).
TOKEN_EXPIRATION=

APP_URL=http://localhost:3001

APP_PORT=3001 
```

* OBS: A princípio, eu deixei a porta padrão da API como 3001 (a porta onde o frontend deve fazer as requisições). Mas caso necessário, pode se alterar.
* OBS2: Coloque no arquivo `.env`somente as linhas com letras maiúsculas, as linhas que começam com `#` NÃO deve ser colocadas no arquivo, elas estão aqui apenas para explicação de cada trecho do arquivo.

3° passo - Preencha o arquivo `.env`criado no passo anterior com as informações que ele pede, colocando os valores logo após o sinal de igualdade, sem aspas e sem espaços. 

4° passo - Instale as dependências do projeto, com o comando `npm i` em um terminal aberto na pasta raiz do projeto.

5° passo - Para criar as tabelas no banco, execute o comando `npx sequelize db:migrate` para que o sequelize execute as migrations

6° passo - Por fim, em um terminal aberto na parta raiz do projeto, execute o comando `npm run dev` para que a API comece a escutar as requisições.



# Documetação da API

<h2>Rotas para usuários</h2>
OBS: O `http://localhost:3001/` é a URL base para executar o projeto localmente na porta 3001. Mesmo assim acabei colocando em todas as rotas abaixo
para evitar qualquer confusão. <br><br>

```bash
# Os dados do usuário a ser criado devem ser passados como JSON no corpo (BODY) da requisição.
POST - Criar usuário
http://localhost:3001/users/

REQUEST BODY - EXAMPLE
`{
  "user_name": "Gustavo",
  "password": "12345678Aa"
}`

GET - Exibir o usuário atualmente logado - USUÁRIO DEVE ESTAR LOGADO
http://localhost:3001/users/

PUT - Atualizar o usuário atualmente logado - USUÁRIO DEVE ESTAR LOGADO
http://localhost:3001/users/
Os dados novos devem ser enviados no BODY da requisição seguindo o mesmo formato do método POST.

DEL - Apagaro usuário atualmente logado - USUÁRIO DEVE ESTAR LOGADO
http://localhost:3001/users/

```


<h2>Rotas para o token</h2> <br>

```bash
# Endpoints para receber o token de um usuário já existente - Login.
POST - Enviar informações do usuário e receber se respectivo token, caso o usuário exista.
http://localhost:3001/users/

REQUEST BODY - EXAMPLE
`{
  "user_name": "Gustavo",
  "password": "12345678Aa"
}`

```


<h2>Rotas para a Account (Conta do usuário - saldo)</h2> <br>

```bash
GET - Consultar balance (saldo) do usuário atualmente logado
http://localhost:3001/accounts

# Fazer Cash-out.
PUT - Caso o cash-out seja bem sucedido, serão atualizados os saldos (balances) do usuário logado e do que recebeu o cash-in.
http://localhost:3001/accounts
O user_name e o valor a ser transferido devem ser enviados no BODY da requisição.

REQUEST BODY - EXAMPLE
`{
  "user_name_cashIn": "Gustavo2",
  "cashOutValue": "100"
}`

```


<h2>Rotas para a Transactions (Transações realizadas)</h2> <br>

```bash
GET - Retornará todas as transações que o usuário atualmente logado participou.
http://localhost:3001/transactions
```

<h4>FILTROS</h4>
É possível filtrar as transações do usuário por Cash-In, Cash-Out e por data.
Para isso, é necessário passar a query correspondente à cada filtro no url de consulta. <br>

Exemplo:
Deseja-se fazer uma consulta para retorna apenas as transações em que o usuário participou recebendo o cash-in, <br>
a consulta GET será feita na url `http://localhost:3001/transactions?filtercashin=true`

O equivalente vale para as transações em que o usuário logado fez Cash-Out. <br>
Porém a url fica como `http://localhost:3001/transactions?filtercashout=true`

E para filtrar por data, basta passar a data no formato aaaa/MM/dd. <br>
`http://localhost:3001/transactions?filterdate=2022/11/16` para filtrar transações da data de 16 de novembro de 2022.

Também é claro possível filtrar usando mais de um parâmetro. Por exemplo filtrando as transações do usuário logado em que ele fez Cash-Out no dia 16 de novembro de 2022, bastaria fazer uma consulta do tipo GET na url <br> `http://localhost:3001/transactions?filterdate=16/11/2022&filtercashout=true`
