import { Credentials, Provider } from '@aws-sdk/types';

interface AwsConfig {
    region: string;
    credentials: Credentials | Provider<Credentials>;
    endpoint?: string;
    tableName: string;
}

function getEnvVar(name: string, defaultValue?: string): string {
    const value = process.env[name];
    if (!value && !defaultValue) {
        throw new Error(`La variable de entorno ${name} no está definida`);
    }
    return value || defaultValue!;
}

function getOptionalEnvVar(name: string): string | undefined {
    return process.env[name];
}

function createCredentials(): Credentials | Provider<Credentials> {
    const accessKeyId = getOptionalEnvVar('AWS_ACCESS_KEY_ID');
    const secretAccessKey = getOptionalEnvVar('AWS_SECRET_ACCESS_KEY');
    const sessionToken = getOptionalEnvVar('AWS_SESSION_TOKEN');

    if (accessKeyId && secretAccessKey) {
        const credentials: Credentials = {
            accessKeyId,
            secretAccessKey,
            sessionToken: sessionToken || undefined,
        };
        return credentials;
    }

    if (process.env.AWS_PROFILE) {
        const fromProfile: Credentials = {
            accessKeyId: '',
            secretAccessKey: '',
        };
        return fromProfile;
    }

    throw new Error('AWS_ACCESS_KEY_ID y AWS_SECRET_ACCESS_KEY deben estar definidos');
}

export const AWS_CONFIG: AwsConfig = {
    region: getEnvVar('AWS_REGION', 'us-east-1'),
    credentials: createCredentials(),
    endpoint: getOptionalEnvVar('DYNAMODB_ENDPOINT'),
    tableName: getEnvVar('DYNAMODB_TABLE_NAME', 'products'),
};

export function isLocalEnvironment(): boolean {
    return !!getOptionalEnvVar('DYNAMODB_ENDPOINT') ||
           getOptionalEnvVar('AWS_SAM_LOCAL') === 'true' ||
           getOptionalEnvVar('LOCALSTACK_HOST') !== undefined;
}

export function getAwsConfig(): AwsConfig {
    return AWS_CONFIG;
}

export function configureAWS(): Pick<AwsConfig, 'region' | 'credentials' | 'endpoint'> {
    return {
        region: AWS_CONFIG.region,
        credentials: AWS_CONFIG.credentials,
        endpoint: AWS_CONFIG.endpoint,
    };
}