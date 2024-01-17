import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navReducer from '../features/NavBarSlice.ts';
import deviceReducer from '../features/deviceSlice.ts';

export const store = configureStore({
	reducer: {
        nav: navReducer,
		device: deviceReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
