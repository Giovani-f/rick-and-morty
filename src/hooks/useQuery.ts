import useSWR from 'swr';
import { Variables } from 'graphql-request';
import { client } from '../lib/graphql-client';

const fetcher = (query: string, variables: Variables = {}) => {
  return client.request(query, variables)};

interface QueryResult<T = any> {
  data: T;
  error: any;
  isLoading: boolean;
}

const useQuery = <T>(query: string, variables: Variables = {}): QueryResult<T> => {
  const strVariables = JSON.stringify(variables);
  const { data, error } = useSWR([query, strVariables], () => fetcher(query, variables));
  return {
    data: data as T,
    isLoading: !error && !data,
    error,
  };
}

export { useQuery }
