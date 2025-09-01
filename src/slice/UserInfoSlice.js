import { createSlice } from '@reduxjs/toolkit'

export const UserInfoSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('userInfo')) || null,
    editValue : null
  },
  reducers: {
    userInfo: (state, action) => {
      state.value = action.payload
    },
    clearUserInfo: (state) => {
      state.value = null   // logout er somoy redux state clear
    },
    // -------------------------------------------------------
    editInfo: (state,action) => {
      state.editValue = action.payload  
    }
  },
})

// Action creators are generated for each case reducer function
export const { userInfo, clearUserInfo,editInfo } = UserInfoSlice.actions

export default UserInfoSlice.reducer