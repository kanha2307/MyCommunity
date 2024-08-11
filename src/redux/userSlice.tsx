import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: true,
    roll_no: true,
    token:""
};

export const userSlice = createSlice({
  name: 'app_state',
  initialState,
  reducers: {
      set_name:(state,action) => {
        state.name=action.payload
      },
      set_roll_no:(state,action) =>{
        state.roll_no = action.payload
      },
      set_init_app_state:(state,action)=>{
        return initialState
      },
  },
})

// Action creators are generated for each case reducer function
export const { set_name,set_roll_no,set_init_app_state } = userSlice.actions

export default userSlice.reducer;