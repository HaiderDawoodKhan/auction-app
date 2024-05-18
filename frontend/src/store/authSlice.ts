import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {User} from '../components/types/User.types'

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};  

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    addAuction(state,action: PayloadAction<string>)
    {
      if(state.user)
      {
        state.user.created_auctions = [action.payload,...state.user.created_auctions]
      }
    },
    changePassword(state, action: PayloadAction<string>)
    {
      if(state.user)
      {
        state.user.password = action.payload
      }
    }  
  },
});

export const { loginSuccess, logout, addAuction, changePassword } = authSlice.actions;
export default authSlice.reducer;