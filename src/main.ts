import express from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/product.routes';
import { errorHandler } from './middlewares/error.middleware';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { configureAWS } from './config/aws.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const dynamoDBClient = new DynamoDBClient(configureAWS());
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);

app.use(express.json());

app.use('/products', productRoutes);

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor cerrado');
    process.exit(0);
  });
});

export { app, docClient };