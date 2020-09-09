import { Schema } from '../type';
export declare const normalizeSchema: (schema: Partial<Schema>) => Schema;
export declare const getSchema: ({ rootSchema, path }: {
    rootSchema: Schema;
    path: string[];
}) => Schema;
