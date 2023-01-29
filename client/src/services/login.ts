import { FormValues } from 'hooks/useForm';
import { postRequest } from 'https/axiosClient';
import { ILogin } from 'models/login';

export const loginService = async (data: FormValues) => {
  const res = await postRequest<FormValues>('api/auth/login', data);
  return res.data as ILogin;
};
export default {};
