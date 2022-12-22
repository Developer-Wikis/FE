import React, { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';

interface objectType {
  [key: string]: string;
}

interface useFormProps<T extends objectType> {
  initialValues: T;
  onSubmit: (e?: FormEvent) => Promise<void> | void;
  validate?: (values: T) => T | objectType;
}

const useForm = <T extends objectType>({ initialValues, onSubmit, validate }: useFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T | objectType>({} as T);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const trimValue = value.trimStart();

    // mainCategory 변경 시 subCategory Select에 선택하세요로 보이게 하기
    if (name === 'mainCategory' && values.mainCategory !== 'none') {
      setValues({ ...values, [name]: trimValue, subCategory: 'none' });
    } else {
      setValues({ ...values, [name]: trimValue });
    }
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const trimValues: objectType = { ...values };

    Object.keys(trimValues).map((key) => (trimValues[key] = trimValues[key].trim()));
    setValues(trimValues as T);

    if (validate) {
      const newErrors = validate(trimValues as T);

      if (Object.keys(newErrors).length === 0) {
        await onSubmit();
      }

      setErrors(newErrors);
    } else {
      await onSubmit();
    }

    setIsLoading(false);
  };

  const handleReset = (values?: T) => {
    if (values) {
      setValues(values);
    } else {
      setValues(initialValues);
    }
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useForm;
