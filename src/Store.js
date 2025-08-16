import { configureStore } from '@reduxjs/toolkit'
import  UserInfoSlice  from './slice/UserInfoSlice'

export default configureStore({
  reducer: {
    currentUser : UserInfoSlice
  },
})