import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SliceProps {
	types: string[];
	title: string;
}

const initialState: SliceProps = {
	types: [],
	title: "",
};

export const filterSlice = createSlice({
	name: "filterSlice",
	initialState,
	reducers: {
		setTypes: (state, action: PayloadAction<string[]>) => {
			state.types = action.payload;
		},
		addType: (state, action: PayloadAction<string>) => {
			state.types = [...state.types, action.payload];
		},
		removeType: (state, action: PayloadAction<string>) => {
			state.types = state.types.filter(
				(type) => type !== action.payload
			);
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
	},
});

export const { setTypes, addType, removeType, setTitle } = filterSlice.actions;

export const selectTypes = (state: RootState) => state.filterSlice.types;
export const selectTitle = (state: RootState) => state.filterSlice.title;

export default filterSlice.reducer;
