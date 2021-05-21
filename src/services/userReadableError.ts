import axios, { AxiosError } from 'axios';

function userReadableAxiosError(error: AxiosError): string {
  if (!error.response) {
    return error.message;
  }

  if (error.response.data?.errors) {
    return Object.values(error.response.data.errors).join('\n');
  }

  if (error.response.data?.message) {
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

  return 'Unknown error';
}
