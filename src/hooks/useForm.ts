import { useState, ChangeEvent } from "react";

type TInputValues = {
  [name: string]: string;
};

const useForm = (inputValues: TInputValues) => {
  const [values, setValues] = useState(inputValues);
  const [isEmpty, setEmpty] = useState(true);

  const checkEmpty = (values: TInputValues) => {
    let check = false;
    for (const [, value] of Object.entries(values)) {
      if (!value) {
        check = true;
        break;
      }
    }
    setEmpty(check);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const changedValues = { ...values, [name]: value };
    setValues(changedValues);
    checkEmpty(changedValues);
  };

  return { values, setValues, isEmpty, setEmpty, handleChange };
};

export default useForm;
