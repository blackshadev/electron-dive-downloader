import { createAction } from '@reduxjs/toolkit';
import { WriterType } from './types';

export const setOutputType = createAction<WriterType>('setOutputType');
export const written = createAction('written');
export const writerDone = createAction('writerDone');
export const setOutputFilePath = createAction<string>('setOutputFilePath');
