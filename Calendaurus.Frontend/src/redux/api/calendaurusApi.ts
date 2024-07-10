import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CalendarEntry, FilterDto } from "../../types";
import { getLocalISOStringFromISOString } from "../../utils";

export const calendaurusApi = createApi({
	reducerPath: "calendaurusApi",

	baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7017/api/" }),

	tagTypes: ["EntryType", "CalendarEntry"],

	endpoints: (builder) => ({
		getAllEntryTypes: builder.query<string[], void>({
			query: () => ({
				url: `EntryType`,
				method: "GET",
			}),
			providesTags: ["EntryType"],
		}),
		getFilteredCalendarEntries: builder.query<
			CalendarEntry[],
			{ token: string; filter: FilterDto }
		>({
			query: ({ token, filter }) => ({
				url: `CalendarEntry/filtered`,
				method: "POST",
				body: filter,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			providesTags: ["CalendarEntry"],
		}),
		addCalendarEntry: builder.mutation<CalendarEntry, {token: string, calendarEntry: CalendarEntry}>({
			query: ({ token, calendarEntry }) => ({
				url: `CalendarEntry`,
				method: "POST",
				body: {
					...calendarEntry,
					startTime: getLocalISOStringFromISOString(calendarEntry.startTime),
					endTime: getLocalISOStringFromISOString(calendarEntry.endTime),
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["CalendarEntry"],
		}),
		updateCalendarEntry: builder.mutation<CalendarEntry, {token: string, calendarEntry: CalendarEntry}>({
			query: ({ token, calendarEntry }) => ({
				url: `CalendarEntry/${calendarEntry.id}`,
				method: "PUT",
				body: {
					...calendarEntry,
					startTime: getLocalISOStringFromISOString(calendarEntry.startTime),
					endTime: getLocalISOStringFromISOString(calendarEntry.endTime),
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["CalendarEntry"],
		}),
		deleteCalendarEntry: builder.mutation<CalendarEntry, {token: string, id: string}>({
			query: ({ token, id }) => ({
				url: `CalendarEntry/${id}`,
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
			invalidatesTags: ["CalendarEntry"],
		}),
	}),
});

export const {
	useGetAllEntryTypesQuery,
	useGetFilteredCalendarEntriesQuery,
	useAddCalendarEntryMutation,
	useUpdateCalendarEntryMutation,
	useDeleteCalendarEntryMutation,
} = calendaurusApi;
