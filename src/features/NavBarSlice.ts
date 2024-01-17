import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NavPagesObject, getNavPages } from "../services/get-nav-pages";

class NavPagesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NavPagesError';
  }
}

export const fetchNavPages = createAsyncThunk(
  "nav/fetchNavPages", 
  async (): Promise<NavPagesObject> => {
  try {
    const data = await getNavPages();
    return data;
  } catch (e) {
    console.log(e);
    throw new NavPagesError("Unable to get navigation pages");
  }
})

interface NavState {
  mobileBarIsOpen: boolean,
  notYetLoaded: boolean,
  navPages: NavPagesObject | null
  navPageError: NavPagesError | null
}

const initialState: NavState = {
    mobileBarIsOpen: false,
    notYetLoaded: true,
    navPages: null,
    navPageError: null
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNavPages.fulfilled, (state, action: PayloadAction<NavPagesObject>) => {
      state.navPages = action.payload;
      state.navPageError = null; 
    });
    builder.addCase(fetchNavPages.rejected, (state, action) => {
      state.navPageError = new NavPagesError(action.error.message || "Unable to fetch nav pages");
    });
  }
})

export const { setMobileBarState, setNotYetLoaded } = navSlice.actions

export default navSlice.reducer
