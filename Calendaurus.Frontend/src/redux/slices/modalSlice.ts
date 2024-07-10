import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CalendarEntry } from "../../types";

interface SliceProps {
	isOpen: boolean;
	calendarEntry: CalendarEntry;
}

const initialState: SliceProps = {
	isOpen: false,
	calendarEntry: {
		title: "",
		startTime: "",
		endTime: "",
		color: "#e5173f",
		type: "Event",
	},
};

export const modalSlice = createSlice({
	name: "modalSlice",
	initialState,
	reducers: {
		setIsOpen: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
		setCalendarEntry: (state, action: PayloadAction<CalendarEntry>) => {
			state.calendarEntry = action.payload;
		},
		removeCalendarEntry: (state) => {
			state.calendarEntry = initialState.calendarEntry;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.calendarEntry.title = action.payload;
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.calendarEntry.description = action.payload;
		},
		setStartTime: (state, action: PayloadAction<string>) => {
			state.calendarEntry.startTime = action.payload;
		},
		setEndTime: (state, action: PayloadAction<string>) => {
			state.calendarEntry.endTime = action.payload;
		},
		setLocation: (state, action: PayloadAction<string>) => {
			state.calendarEntry.location = action.payload;
		},
		setColor: (state, action: PayloadAction<string>) => {
			state.calendarEntry.color = action.payload;
		},
		setType: (state, action: PayloadAction<string>) => {
			state.calendarEntry.type = action.payload;
		},
	},
});

export const {
	setIsOpen,
	setCalendarEntry,
	removeCalendarEntry,
	setTitle,
	setDescription,
	setStartTime,
	setEndTime,
	setLocation,
	setColor,
	setType,
} = modalSlice.actions;

export const selectIsOpen = (state: RootState) => state.modalSlice.isOpen;
export const selectCalendarEntry = (state: RootState) =>
	state.modalSlice.calendarEntry;

export default modalSlice.reducer;
