import { createSlice } from '@reduxjs/toolkit'

export const UserInfoSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  reducers: {
    userInfo: (state, action) => {
      state.value = action.payload
    },
    clearUserInfo: (state) => {
      state.value = null   // logout er somoy redux state clear
    }
  },
})

// Action creators are generated for each case reducer function
export const { userInfo, clearUserInfo } = UserInfoSlice.actions

export default UserInfoSlice.reducer