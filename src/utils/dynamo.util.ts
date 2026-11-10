import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { AWS_CONFIG } from '../config/aws.config';

export function createDynamoDBClient(): DynamoDBClient {
    const config: DynamoDBClientConfig = {
        region: AWS_CONFIG.region,
        credentials: AWS_CONFIG.credentials,
    };

    if (AWS_CONFIG.endpoint) {
        config.endpoint = AWS_CONFIG.endpoint;
    }

    return new DynamoDBClient(config);
}

export function createDocClient(client: DynamoDBClient): DynamoDBDocumentClient {
    return DynamoDBDocumentClient.from(client, {
        marshallOptions: {
            removeUndefinedValues: true,
            convertClassInstanceToMap: true,
        },
        unmarshallOptions: {
            wrapNumbers: false,
        },
    });
}

export async function putItem<T>(docClient: DynamoDBDocumentClient, tableName: string, item: T): Promise<T> {
    const command = new PutCommand({
        TableName: tableName,
        Item: item as Record<string, unknown>,
    });
    await docClient.send(command);
    return item;
}

export async function getItem<T>(docClient: DynamoDBDocumentClient, tableName: string, key: Record<string, unknown>): Promise<T | null> {
    const command = new GetCommand({
        TableName: tableName,
        Key: key,
    });
    const result = await docClient.send(command);
    return (result.Item as T) || null;
}

export async function updateItem<T>(
    docClient: DynamoDBDocumentClient,
    tableName: string,
    key: Record<string, unknown>,
    updateExpression: string,
    expressionAttributeValues: Record<string, unknown>
): Promise<T> {
    const command = new UpdateCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    });
    const result = await docClient.send(command);
    return result.Attributes as T;
}

export async function deleteItem(docClient: DynamoDBDocumentClient, tableName: string, key: Record<string, unknown>): Promise<void> {
    const command = new DeleteCommand({
        TableName: tableName,
        Key: key,
    });
    await docClient.send(command);
}

export async function scanTable<T>(docClient: DynamoDBDocumentClient, tableName: string): Promise<T[]> {
    const command = new ScanCommand({
        TableName: tableName,
    });
    const result = await docClient.send(command);
    return (result.Items as T[]) || [];
}