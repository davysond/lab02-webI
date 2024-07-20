// Importando os módulos necessários
import express, { Request, Response } from 'express';

// Configurando o servidor Express
const app = express();
app.use(express.json());

// Simulando um banco de dados em memória com um array de livros
let books: { id: number, title: string, author: string }[] = [
    { id: 1, title: 'Dom Casmurro', author: 'Machado de Assis' },
    { id: 2, title: 'A Arte da Guerra', author: 'Sun Tzu' }
];

// Rota para obter todos os livros (GET /books)
app.get('/books', (req: Request, res: Response) => {
    res.status(200).json(books);
});

// Rota para adicionar um novo livro (POST /books)
app.post('/books', (req: Request, res: Response) => {
    const { title, author } = req.body;
    const id = books.length + 1; // Simplesmente incrementando o ID (em uma aplicação real, use um UUID por exemplo)
    const newBook = { id, title, author };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Rota para atualizar um livro por ID (PUT /books/:id)
app.put('/books/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
      books[index] = { id, title, author };
      res.status(200).json(books[index]);
  } else {
      res.status(404).send('Book not found');
  }
});

// Rota para deletar um livro por ID (DELETE /books/:id)
app.delete('/books/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(b => b.id !== id);
  if (books.length < initialLength) {
      res.status(204).send(); // No content
  } else {
      res.status(404).send('Book not found');
  }
});


// Inicializando o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
