import { Firebase } from '../firebase';

export const useMe = () => {
  const me = () => {
    return Firebase.auth.currentUser;
  };

  return {
    me,
  };
};
