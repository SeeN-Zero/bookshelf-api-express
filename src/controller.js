import {nanoid} from 'nanoid';
import books from "./books.js";

const createBook = (req, res) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.body;

    if (!name) {
        return res.status(400).json({
            status: "fail", message: "Gagal menambahkan buku. Mohon isi nama buku"
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: "fail", message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };

    books.push(newBook);

    return res.status(201).json({
        status: "success", message: "Buku berhasil ditambahkan", data: {
            bookId: id,
        },
    });
};

const getAllBooks = (req, res) => {
    const {name, reading, finished} = req.query;

    let filteredBooks = books;

    if (name !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.reading === (reading === '1'));
    }

    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter((book) => book.finished === (finished === '1'));
    }

    const simplifiedBooks = filteredBooks.map((book) => ({
        id: book.id, name: book.name, publisher: book.publisher,
    }));

    return res.status(200).json({
        status: "success", data: {
            books: simplifiedBooks,
        },
    });
};

const getBookById = (req, res) => {
    const {id: bookId} = req.params;

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        return res.status(404).json({
            status: "fail", message: "Buku tidak ditemukan",
        });
    }

    return res.status(200).json({
        status: "success", data: {
            book,
        },
    });
};

const updateBookById = (req, res) => {
    const {id: bookId} = req.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.body;
    const updatedAt = new Date().toISOString();

    if (!name) {
        return res.status(400).json({
            status: "fail", message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: "fail", message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
    }

    //Find it by Array Index
    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            status: "fail", message: "Gagal memperbarui buku. Id tidak ditemukan",
        });
    }

    const finished = pageCount === readPage;

    books[index] = {
        ...books[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt,
    };

    return res.status(200).json({
        status: "success", message: "Buku berhasil diperbarui",
    });
};

const deleteBookById = (req, res) => {
    const {id: bookId} = req.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index === -1) {
        return res.status(404).json({
            status: "fail", message: "Buku gagal dihapus. Id tidak ditemukan",
        });
    }

    books.splice(index, 1);

    return res.status(200).json({
        status: "success", message: "Buku berhasil dihapus",
    });
};


export {createBook, getAllBooks, getBookById, updateBookById, deleteBookById};
