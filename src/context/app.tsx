import { createContext, type Dispatch, type SetStateAction } from 'react';

export const AppContext = createContext<{
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}>({
  token: '',
  setToken: () => {},
});
