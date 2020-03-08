import { GraphQLClient } from 'graphql-request'
const endpoint = process.env.CRICKET_API_URL;
 
export const client = new GraphQLClient(endpoint);
