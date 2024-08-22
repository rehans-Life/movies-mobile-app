import {AuthTokens} from 'aws-amplify/auth';
import {create} from 'zustand';

interface UserStore {
  tokens: AuthTokens | null;
  setAuthTokens: (tokens: AuthTokens) => void;
  emptyTokens: () => void;
}

const useUserStore = create<UserStore>(set => ({
  tokens: null,
  setAuthTokens: tokens => set(state => ({...state, tokens})),
  emptyTokens: () => set(state => ({...state, tokens: null})),
}));

export default useUserStore;
