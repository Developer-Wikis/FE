import React, { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react';

interface objectType {
  [key: string]: string;
}

interface useFormProps<T> {
  initialValues: T;
  onSubmit: () => Promise<void>;
  validate: (values: T) => T | objectType;
}

const useForm = <T extends objectType>({ initialValues, onSubmit, validate }: useFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T | objectType>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = validate(values);

    if (Object.keys(newErrors).length === 0) {
      await onSubmit();
    }

    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
