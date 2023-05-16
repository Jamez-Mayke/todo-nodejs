## TODO

CRUD de um TODO LIST desenvolvido utilizando: node.js, cors e express.js
Foi utilizado como informação para validar o acesso do usuário seu username, enviado via headers, a lógica para verificar se a conta de um usuário existe ou não foi construída no middleware "checksExistsUserAccount""

## Requisitos a serem desenvolvidos

- [x] Deve ser possível criar um novo usuário
- [x] Deve ser possível listar todos os todos de um usuário
- [x] Deve ser possível criar um todo para o usuário
- [x] Deve ser possível atualizar as informações do todo
- [x] Deve ser possível marcar o todo como concluído
- [x] Deve ser possível deletar um todo

## regras de negócio

- [x] Não deve ser possível atualizar as informações de um todo que não existe
- [x] Não deve ser possível marcar um todo que não existe
- [x] Não deve ser possível deletar um todo que não existe
- [x] Não deve ser possível criar um novo usuário com um username já existente
