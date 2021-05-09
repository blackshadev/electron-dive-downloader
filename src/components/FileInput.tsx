import React, { useState } from 'react';
import electron from 'electron';
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
  const [filePathValue, setFilePathValue] = useState(value);

  async function openDialog() {
    const browserWindow = electron.remote.getCurrentWindow();
    const dialogResult = await electron.remote.dialog.showSaveDialog(
      browserWindow,
      {
        title,
        defaultPath: filePathValue ? path.resolve(filePathValue) : undefined,
        filters: [
          { name: 'JSON Files', extensions: ['json'] },
          { name: 'All Files', extensions: ['*'] },
        ],
        properties: ['createDirectory', 'showOverwriteConfirmation'],
      }
    );

    const newValue = dialogResult.filePath;
    if (!dialogResult.canceled && newValue !== undefined) {
      setFilePathValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  }

  return (
    <>
      <Input name={name} id={name} value={filePathValue} readOnly />
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
