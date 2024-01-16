import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NavState {
  mobileBarIsOpen: boolean,
  notYetLoaded: boolean,
}

const initialState: NavState = {
    mobileBarIsOpen: false,
    notYetLoaded: true,
}

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setMobileBarState: (state) => {
      state.mobileBarIsOpen = !state.mobileBarIsOpen;
    },
    setNotYetLoaded: (state) => {
      state.notYetLoaded = false;
    }
  }
})

export const { setMobileBarState, setNotYetLoaded } = navSlice.actions

export default navSlice.reducer
