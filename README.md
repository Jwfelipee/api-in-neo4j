<h2 align="center"> API feita usando node, express e neo4j </h2>
<p>
 Como rodar o projeto?
</p>

```
Clone o repositório
- git clone https://github.com/Jwfelipee/api-in-neo4j.git

Entre no diretório
- cd api-in-neo4j

Instale as dependências
- npm install ou npm ci

Inicie o servidor
- npm run dev

Observações
- certifique-se de ter o node instalado
```

## Rotas

### Produtos
- GET `/products` - retorna todos os produtos
- POST `/products` - cria um novo produto
- example of object to create
```json
{
	"name": "product name",
	"description": "product description",
	"price": 10.99
}
```
- DELETE `/products/:id` - deleta um produto pelo id

### Estoque
- GET `/stock` - retorna todos os estoques
- POST `/stock` - cria um novo estoque
- example of object to create
```json
{
	"quantity": 10,
	"productId": "id of the product"
}
```
- DELETE `/stock/:id` - deleta um estoque pelo id

### Loja
- POST `/buy` - compra um produto
- example of object to create
```json
{
	"productId": "id of the product",
	"quantity": 1
}
```

## Autor 🧑🏽
Feito com ❤️ por:
- [João Wictor Felipe](https://github.com/Jwfelipee/)