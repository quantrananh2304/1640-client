import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { UserInfoState } from '~/types/index';

export const initialStateValue = '';

export interface UserSliceState {
  userInfo: UserInfoState | undefined | null;
  userData: any;
}

export const userSlice = createSlice<UserSliceState, SliceCaseReducers<UserSliceState>>({
  name: 'userSlice',
  initialState: {
    userData: undefined,
    userInfo: undefined,
  },
  reducers: {
    setUserInfo: (state: UserSliceState, action: PayloadAction<UserSliceState>) => {
      const userData = action.payload;
      return {
        ...state,
        userData,
      };
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
