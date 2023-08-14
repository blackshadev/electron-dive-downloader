import axios, { AxiosError } from 'axios';

function userReadableAxiosError(error: AxiosError<{ errors: string[] }|{message: string}>): string {
  if (!error.response) {
    return error.message;
  }

  if ('errors' in error.response.data) {
    return Object.values(error.response.data.errors).join('\n');
  }

  if ('message' in error.response.data) {
    return error.response.data.message;
  }

  if (error.response.data) {
    return `Unprocessable data ${JSON.stringify(error.response?.data)}`;
  }

  return error.response.statusText;
}

export default function userReadableError(error: unknown): string {
  if (error instanceof Error && axios.isAxiosError(error)) {
    return userReadableAxiosError(error);
  }
  if (error instanceof Error) {
    return error.message;
  }

  return `Unknown error ${error}`;
}
