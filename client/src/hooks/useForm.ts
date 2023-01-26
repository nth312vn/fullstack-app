import React, { useState } from 'react';

export interface FormValues {
  [key: string]: any;
}
export interface Validation {
  [key: string]: (value: any, allValues: FormValues) => string | undefined;
}

export interface IUseFormProps {
  defaultValue: FormValues;
  validation?: Validation;
}

const useForm = (props: IUseFormProps) => {
  const { defaultValue, validation } = props;
  const [formData, setFormData] = useState(defaultValue);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const onChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };
  const validate = () => {
    if (validation) {
      const resultValidation = Object.keys(validation).map((item) => {
        const result = validation[item]?.(formData[item], formData);
        return {
          [item]: result,
        };
      });
      setErrors(resultValidation);
    }
  };
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    onSubmit: (data: FormValues) => void,
  ) => {
    validate();
    e.preventDefault();
    onSubmit(formData);
  };
  const setValue = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const clearFormData = () => {
    setFormData(defaultValue);
  };
  const getValue = (name: string) => formData[name];

  return {
    formData,
    errors,
    touched,
    onChange,
    handleSubmit,
    handleBlur,
    setValue,
    clearFormData,
    getValue,
  };
};
export type IUseForm = ReturnType<typeof useForm>;
export default useForm;
