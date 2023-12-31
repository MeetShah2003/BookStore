const express = require("express");
const { connection } = require("./db");
const { bookModel } = require("./book");
const { isValid } = require("./auth.middleware");

const app = express();
app.use(express.json());


// Welcome to BookStore

app.get('/', (req, res) => {
    res.send('welcome to the book store');
})

app.get('/books/book/:id', async (req, res) => {
    const { id } = req.params;
    const getBook = await bookModel.findById(id);
    if (getBook) {
        res.status(200).send(getBook);
    }
    else {
        res.status(404).send("Book not found");
    }
})

app.get('/books', async (req, res) => {
    const getBooks = await bookModel.find();
    res.send(getBooks);
})

// delete Books

app.delete('/books/delete/:id', async (req, res) => {
    const { id } = req.params;
    const deleteBook = await bookModel.findByIdAndDelete(id);
    const avaBook = await bookModel.find(req.body);
    res.send(avaBook);
})

// add Books

app.post('/books/addbooks', isValid, async (req, res) => {
    const addBook = await bookModel.create(req.body);
    res.send(addBook);
})

// update Books

app.patch('/books/update/:id', async (req, res) => {
    const { id } = req.params;
    const updateBook = await bookModel.findOneAndUpdate({ _id: id }, { $set: req.body })
    res.send(updateBook);
})

// filter Books

app.get('/books/filter', async (req, res) => {
    const { author, category, sort } = req.query;
    if (sort == "lth") {
        const filter = await bookModel.find().sort({ price: 1 });
        res.send(filter);
    }
    else if (sort == 'htl') {
        const filter = await bookModel.find().sort({ price: -1 });
        res.send(filter);
    }
    else if (author) {
        const filter = await bookModel.find({ author: author });
        res.send(filter);
    }
    else if (category) {
        const filter = await bookModel.find({ category: category });
        res.send(filter);
    }
});

app.listen(8090, () => {
    console.log("Server is running on port 8090");
    connection();
})