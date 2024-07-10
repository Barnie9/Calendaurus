import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface SliceProps {
	entryTypes: string[];
}

const initialState: SliceProps = {
	entryTypes: [],
};

export const entryTypeSlice = createSlice({
	name: "entryTypeSlice",
	initialState,
	reducers: {
		setEntryTypes: (state, action: PayloadAction<string[]>) => {
			state.entryTypes = action.payload;
		},
	},
});

export const { setEntryTypes } = entryTypeSlice.actions;

export const selectEntryTypes = (state: RootState) =>
	state.entryTypeSlice.entryTypes;

export default entryTypeSlice.reducer;
