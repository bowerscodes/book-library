const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');
const reader = require('../src/models/reader');

describe('/books', () => {
    before(async () => Book.sequelize.sync());

    beforeEach(async () => {
        await Book.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /books', () => {
            it('creates a new book in the database', async () => {
                const response = await request(app).post('/books').send({
                    title: 'The Very Hungry Caterpillar',
                    author: 'Eric Carle',
                    genre: 'childrens',
                    ISBN: '9783806741360',
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true
                });

                expect(response.status).to.equal(201);
                expect(newBookRecord.title).to.equal('The Very Hungry Caterpillar');
                expect(newBookRecord.author).to.equal('Eric Carle');
                expect(newBookRecord.ISBN).to.equal('9783806741360');
            });
        });
    });

    describe('with records in the database', () => {
        let books;

        beforeEach(async () => {
            books = await Promise.all([
                Book.create({
                    title: 'The Very Hungry Caterpillar',
                    author: 'Eric Carle',
                    genre: 'childrens',
                    ISBN: '9783806741360',
                }),
                Book.create({ title: 'SIMPLE', author: 'Yotam Ottolenghi', genre: 'Cooking', ISBN: '9781785031168' }),
                Book.create({ title: 'SIMPLY', author: 'Sabrina Ghayour', genre: 'Cooking', ISBN: '1784725161' })
            ]);
        });

        describe('GET /books', () => {
            it('gets all book records', async () => {
                const response = await request(app).get('/books');

                expect(response.status).to.equal(200);
                expect(response.body.length).to.equal(3);

                response.body.forEach((book) => {
                    const expected = books.find((a) => a.id === book.id);

                    expect(book.title).to.equal(expected.title);
                    expect(book.author).to.equal(expected.author);
                    expect(book.genre).to.equal(expected.genre);
                    expect(book.ISBN).to.equal(expected.ISBN);
                });
            });
        });

        describe('GET /books/:id', () => {
            it('gets books record by id', async () => {
                const book = books[0];
                const response = await request(app).get(`/books/${book.id}`);

                expect(response.status).to.equal(200);
                expect(response.body.title).to.equal(book.title);
                expect(response.body.author).to.equal(book.author);
                expect(response.body.genre).to.equal(book.genre);
                expect(response.body.ISBN).to.equal(book.ISBN);
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app).get('/books/12345');

                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });
        });

        describe('PATCH /books/:id', () => {
            it('updates books genre by id', async () => {
                const book = books[1];
                const response = await request(app)
                    .patch(`/books/${book.id}`)
                    .send({ genre: 'Cooking & Baking' })
                
                    const updatedBookRecord = await Book.findByPk(book.id, {
                        raw: true,
                    });

                expect(response.status).to.equal(200);
                expect(updatedBookRecord.genre).to.equal('Cooking & Baking');
            });

            it('returns a 404 if the book does not exist', async () => {
                const response = await request(app)
                    .patch('/books/12345')
                    .send({ genre: 'A new genre, a new day' })
                
                expect(response.status).to.equal(404);
                expect(response.body.error).to.equal('The book could not be found.');
            });

        })

    });
});