import request from 'supertest';
import { Express } from 'express';

describe('Product API', () => {
    let app: Express;
    const testProduct = {
        name: 'Test Product',
        price: 99.99,
        stock: 10,
        category: 'Electronics'
    };

    beforeAll(() => {
        app = require('../src/app').default;
    });

    describe('POST /products', () => {
        it('should create a new product', async () => {
            const response = await request(app)
                .post('/products')
                .send(testProduct)
                .expect('Content-Type', /json/);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(testProduct.name);
        });

        it('should return 400 for invalid product data', async () => {
            const invalidProduct = { name: '', price: -10 };
            const response = await request(app)
                .post('/products')
                .send(invalidProduct);
            expect(response.status).toBe(400);
        });

        it('should return 400 for duplicate product name', async () => {
            await request(app)
                .post('/products')
                .send(testProduct);
            const response = await request(app)
                .post('/products')
                .send(testProduct);
            expect(response.status).toBe(409);
        });
    });

    describe('GET /products/:id', () => {
        it('should return a product by id', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const response = await request(app)
                .get(`/products/${productId}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(productId);
        });

        it('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .get('/products/non-existent-id');
            expect(response.status).toBe(404);
        });
    });

    describe('PUT /products/:id', () => {
        it('should update an existing product', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const updateData = { name: 'Updated Product', price: 149.99 };
            const response = await request(app)
                .put(`/products/${productId}`)
                .send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(updateData.name);
            expect(response.body.price).toBe(updateData.price);
        });

        it('should return 400 for negative price', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const response = await request(app)
                .put(`/products/${productId}`)
                .send({ price: -50 });
            expect(response.status).toBe(400);
        });
    });

    describe('DELETE /products/:id', () => {
        it('should delete an existing product', async () => {
            const createResponse = await request(app)
                .post('/products')
                .send(testProduct);
            const productId = createResponse.body.id;

            const response = await request(app)
                .delete(`/products/${productId}`);
            expect(response.status).toBe(204);

            const getResponse = await request(app)
                .get(`/products/${productId}`);
            expect(getResponse.status).toBe(404);
        });

        it('should return 404 for non-existent product', async () => {
            const response = await request(app)
                .delete('/products/non-existent-id');
            expect(response.status).toBe(404);
        });
    });

    describe('GET /products', () => {
        it('should return all products', async () => {
            await request(app).post('/products').send(testProduct);

            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });
});