import userReadableError from './userReadableError';

export default async function handleAxiosError<T>(
  cb: () => Promise<T>
): Promise<T> {
  try {
    return await cb();
  } catch (error) {
    throw new Error(userReadableError(error));
  }
}
