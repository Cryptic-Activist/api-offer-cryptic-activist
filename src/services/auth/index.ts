import { USER_API_ENDPOINT } from '../../constants/envs';
import { fetchGet } from '../axios';

export const getAuth = async (authorization: string) => {
  const response = await fetchGet(
    `${USER_API_ENDPOINT}/users/authorization/authorize`,
    { Authorization: authorization },
  );

  if (response.status !== 200) {
    return null;
  }

  return response.data;
};
