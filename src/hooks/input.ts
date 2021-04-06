import React, { useState } from 'react';

export default (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
  };
};
