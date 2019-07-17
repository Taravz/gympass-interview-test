# OVERVIEW
Essa aplicação foi desenvolvida usando NodeJs, NPM e Typescript. Segue abaixo uma breve descrição da estrutura de diretórios:
* **source** - Arquivos fonte da aplicação
* **test** - Arquivos de teste da aplicação
* **test_logs** - Arquivos log de teste

A escolha por Typescript foi feita devido a esta linguagem ser uma boa mistura entre a facilidade de desenvolvimento do Javascript e a capacidade de estruturamento de linguagens como C++ e Java.


# COMO RODAR
Execute **npm install** para instalar todas as dependências necessárias e em seguida **npm start** para compilar o fonte em Typescript e executar a aplicação.

Por padrão o script "npm start" irá executar a aplicação lendo o arquivo de log "entrada_normalizado.txt" da pasta "test_logs". Para rodar a aplicação com um arquivo de log diferente edite a linha 8 do package.json e insira o path para o arquivo que se deseja utilizar no lugar da string "./test_logs/entrada_normalizado.txt".


# COMO TESTAR
Para rodar todos os testes execute **npm install** para instalar todas as dependências necessárias e em seguida **npm test** para compilar e executar os testes.

# OBSERVAÇÕES
O arquivo de log de exemplo disponível na página https://github.com/Gympass/interview-test não possui especificações a respeito dos tamanhos de cada campo, então assumi os valores abaixo:
* Hora - 12 caracteres
* ID - 3 caracteres
* Nome - 32 caracteres
* Nº volta - 2 caracteres (até 99 voltas)
* Tempo Volta - 9 caracteres (até 59:59.999)
* Velocidade Média da Volta - 7 caracteres (até 999 km/h)

O log de exemplo também possui algumas inconsistências entre as linhas (algumas linhas possuem caracteres "TAB" em algumas posições, outras possuem esses caracteres em outras posições e outras não possuem TAB nenhum). Assumi que essas inconsistências ocorrem devido à formatação da página WEB e normalizei o arquivo para realizar o desenvolvimento e testes. Na pasta "test_logs" podem ser encontradas as versões original (igual ao copiado da página) e normalizada.