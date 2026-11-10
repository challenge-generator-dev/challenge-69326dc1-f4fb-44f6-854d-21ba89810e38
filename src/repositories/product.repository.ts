import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../models/product.model';
import { injectable } from 'inversify';

export interface IProductRepository {
    createProduct(product: Product): Promise<Product>;
    getProduct(id: string): Promise<Product | null>;
    updateProduct(id: string, product: Partial<Product>): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    listProducts(): Promise<Product[]>;
}

@injectable()
export class ProductRepository implements IProductRepository {
    private readonly client: DynamoDBDocumentClient;
    private readonly tableName: string = process.env.DYNAMODB_TABLE_NAME || 'Products';

    constructor() {
        const dynamoClient = new DynamoDBClient({
            region: process.env.AWS_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
            }
        });
        this.client = DynamoDBDocumentClient.from(dynamoClient);
    }

    async createProduct(product: Product): Promise<Product> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: {
                id: product.id || this.generateId(),
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category
            },
            ConditionExpression: 'attribute_not_exists(id)'
        });

        await this.client.send(command);
        return product;
    }

    async getProduct(id: string): Promise<Product | null> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: { id }
        });

        const response = await this.client.send(command);
        if (!response.Item) {
            return null;
        }

        return new Product({
            id: response.Item.id,
            name: response.Item.name,
            price: response.Item.price,
            stock: response.Item.stock,
            category: response.Item.category
        });
    }

    async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
        const updateExpressions: string[] = [];
        const expressionAttributeValues: Record<string, unknown> = {};
        const expressionAttributeNames: Record<string, string> = {};

        if (product.name !== undefined) {
            updateExpressions.push('#name = :name');
            expressionAttributeNames['#name'] = 'name';
            expressionAttributeValues[':name'] = product.name;
        }

        if (product.price !== undefined) {
            updateExpressions.push('price = :price');
            expressionAttributeValues[':price'] = product.price;
        }

        if (product.stock !== undefined) {
            updateExpressions.push('stock = :stock');
            expressionAttributeValues[':stock'] = product.stock;
        }

        if (product.category !== undefined) {
            updateExpressions.push('category = :category');
            expressionAttributeValues[':category'] = product.category;
        }

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { id },
            UpdateExpression: 'SET ' + updateExpressions.join(', '),
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: 'ALL_NEW'
        });

        const response = await this.client.send(command);
        if (!response.Attributes) {
            throw new Error('Product not found');
        }

        return new Product({
            id: response.Attributes.id,
            name: response.Attributes.name,
            price: response.Attributes.price,
            stock: response.Attributes.stock,
            category: response.Attributes.category
        });
    }

    async deleteProduct(id: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { id }
        });

        await this.client.send(command);
    }

    async listProducts(): Promise<Product[]> {
        const command = new ScanCommand({
            TableName: this.tableName
        });

        const response = await this.client.send(command);
        if (!response.Items) {
            return [];
        }

        return response.Items.map(item => new Product({
            id: item.id,
            name: item.name,
            price: item.price,
            stock: item.stock,
            category: item.category
        }));
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}