const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

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
                    ISBN: '9783806741360'
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('The Very Hungry Caterpillar');
                expect(newBookRecord.author).to.equal('Eric Carle');
                expect(newBookRecord.ISBN).to.equal('9783806741360');
            });
        });
    });

});