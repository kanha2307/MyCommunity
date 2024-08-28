import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    _id:'',
    name: '',
    email:'',
    phoneNumber:'',
    avatar:'',
    token:''
};

export const userSlice = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
      setname:(state,action) => {
        state.name=action.payload
      },
      setid:(state,action)=>{
        state._id = action.payload
      },
      setemail:(state,action) =>{
        state.email = action.payload
      },
      setphone:(state,action) =>{
        state.phoneNumber = action.payload
      },
      setavatar:(state,action) =>{
        state.avatar = action.payload
      },
      settoken:(state,action) =>{
        state.token = action.payload
      },
      set_init_app_state:()=>{
        return initialState
      },
  },
})
export const { set_init_app_state,setavatar,setemail,setname,setphone,settoken,setid } = userSlice.actions

export default userSlice.reducer;