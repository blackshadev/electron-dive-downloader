import axios from 'axios';

export default async function handleAxiosError<T>(
  cb: () => Promise<T>
): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    if (!axios.isAxiosError(error) || !error.response) {
      throw error;
    }

    if (error.response.data?.errors) {
      throw new Error(Object.values(error.response?.data?.errors).join('\n'));
    }

    if (error.response.data?.message) {
      throw new Error(error.response?.data?.message);
    }

    if (error.response.data) {
      throw new Error(
        `Unprocessable data ${JSON.stringify(error.response?.data)}`
      );
    }

    throw new Error('Unknown error');
  }
}
