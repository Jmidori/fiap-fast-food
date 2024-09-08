import express from "express";

const app = express();

app.use(express.json());

const books = [
    {id: 1, "title": "Misery"},
    {id: 2, "title": "Mr. Mercedes"}];

app.get('/', (req, res) => {
    res.status(200).send('Curso de Node');
});

app.get('/livros/:id', (req, res) => {
    let index = getBookIndex(req.params.id);
    res.status(200).json(books[index]);
});

app.get('/livros', (req, res) => {
    books.find((err, books) => {
        res.status(200).json(books);
    })
});

app.post('/livros', (req, res) => {
    books.push(req.body);
    res.status(201).send('Livro cadastrado com sucesso');
});

app.put('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = getBookIndex(id);
    books[index].title = req.body.title;
    res.json(books);
});

app.delete('/livros/:id', (req, res) => {
    let {id} = req.params;
    let index = getBookIndex(id);
    let title = books[index].title;

    books.splice(index,1);
    res.send(`O livro ${title} foi removido com sucesso`);
});

function getBookIndex(id){
    return books.findIndex(book => book.id == id);
};

export default app