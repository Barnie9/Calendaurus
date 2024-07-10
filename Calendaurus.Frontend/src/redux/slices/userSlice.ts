import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../types";

interface SliceProps {
	user: User;
}

const initialState: SliceProps = {
	user: {
		name: "",
		email: "",
		token: "",
	},
};

export const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = initialState.user;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.userSlice.user;
export const selectToken = (state: RootState) => state.userSlice.user.token;

export default userSlice.reducer;
