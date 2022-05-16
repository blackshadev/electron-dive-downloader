import React, { useCallback } from 'react';
import { ipcRenderer } from 'electron';
import path from 'path';
import Button from './Button';
import Input from './Input';

interface FileInputProps {
  name: string;
  onChange?(value: string): void;
  value?: string;
  title?: string;
}

export default function SaveFileInput({
  name,
  title,
  onChange,
  value,
}: FileInputProps) {
  const openDialog = useCallback(async () => {
    const defaultPath = value ? path.resolve(value) : undefined;
    const dialogResult = (await ipcRenderer.invoke('showSaveDialog', {
      title,
      defaultPath,
    })) as Electron.SaveDialogReturnValue;

    if (dialogResult.canceled) {
      return;
    }

    onChange?.(dialogResult.filePath ?? '');
  }, [title, value, onChange]);

  return (
    <>
      <Input name={name} id={name} value={value} readOnly />
      <Button
        outline
        onClick={(e) => {
          e.preventDefault();
          openDialog();
        }}
      >
        Browse...
      </Button>
    </>
  );
}
SaveFileInput.defaultProps = {
  onChange: undefined,
  value: '',
  title: 'Save file',
};
