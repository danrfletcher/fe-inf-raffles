import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type deviceType = "mobile" | "tablet" | "desktop";
export type orientation = "portrait" | "landscape";

interface DeviceState {
    type: deviceType,
    orientation: orientation
}

const initialState: DeviceState = {
    type: "mobile",
    orientation: "portrait"
}

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        setDevice: (state, action: PayloadAction<deviceType>) => {
            state.type = action.payload;
        },
        setOrientation: (state, action: PayloadAction<orientation>) => {
            state.orientation = action.payload;
        },
    },
});

export const { setDevice, setOrientation } = deviceSlice.actions;

export default deviceSlice.reducer;