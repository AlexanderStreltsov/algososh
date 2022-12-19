import { useState, ChangeEvent } from "react";

type TFormInputs = {
  [name: string]: {
    value: string;
    pattern?: RegExp;
  };
};

const useForm = (inputValues: TFormInputs) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { pattern } = values[name];

    if ((pattern && pattern.test(value)) || !value || !pattern) {
      setValues({ ...values, [name]: { value: value.trim(), pattern } });
    }
  };

  return { values, setValues, handleChange };
};

export default useForm;
