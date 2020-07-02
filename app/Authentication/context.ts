import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import Api, {Credential} from 'app/Services/api';

interface ContextProp {
  signIn: (credential: Credential) => Promise<void>;
  signOut: () => void;
  signUp: (credential: Credential) => Promise<void>;
}

export const AuthContext = React.createContext<Partial<ContextProp>>({});
