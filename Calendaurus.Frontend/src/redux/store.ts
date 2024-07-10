import { configureStore } from "@reduxjs/toolkit";
import { calendaurusApi } from "./api/calendaurusApi";
import entryTypeSlice from "./slices/entryTypeSlice";
import userSlice from "./slices/userSlice";
import dateSlice from "./slices/dateSlice";
import filterSlice from "./slices/filterSlice";
import modalSlice from "./slices/modalSlice";

export const store = configureStore({
	reducer: {
		entryTypeSlice: entryTypeSlice,
		userSlice: userSlice,
		dateSlice: dateSlice,
		filterSlice: filterSlice,
		modalSlice: modalSlice,
		[calendaurusApi.reducerPath]: calendaurusApi.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: ["dateSlice/setCurrentSelectedDay"],
				// Ignore these field paths in all actions
				ignoredActionPaths: ["meta.arg", "payload.timestamp"],
				// Ignore these paths in the state
				ignoredPaths: ["dateSlice.currentSelectedDate"],
			},
		}).concat(calendaurusApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
