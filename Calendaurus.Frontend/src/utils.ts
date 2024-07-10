import dayjs, { Dayjs } from "dayjs";
import { CalendarEntry, Cell } from "./types";

export const getWeekDaysFromCurrentWeek = (currentDay: Dayjs) => {
	const days: Dayjs[] = [];

	for (let i = 0; i < 7; i++) {
		days.push(currentDay.startOf("week").add(i, "day"));
	}

	return days;
};

export const getSundayFromPastWeek = (currentDay: Dayjs) => {
	return currentDay.subtract(7, "day").startOf("week");
};

export const getSundayFromNextWeek = (currentDay: Dayjs) => {
	return currentDay.add(7, "day").startOf("week");
};

export const getSundayFromCurrentWeek = (currentDay: Dayjs) => {
	return getLocalDayjsFromDayjs(currentDay.startOf("week").startOf("day"));
};

export const getSaturdayFromCurrentWeek = (currentDay: Dayjs) => {
	return getLocalDayjsFromDayjs(currentDay.endOf("week").endOf("day"));
};

export const getIndexOfDayInWeek = (day: Dayjs) => {
	return day.day() * 2 + 3;
};

export const getHourFromNumber = (number: number) => {
	if (number < 10) {
		return `0${number}:00`;
	} else {
		return `${number}:00`;
	}
};

export const generateCellsList = (
	startRow: number,
	endRow: number,
	startColumn: number,
	endColumn: number
): Cell[] => {
	const cells: Cell[] = [];

	for (let column = startColumn; column <= endColumn; column += 2) {
		for (let row = startRow; row <= endRow; row++) {
			cells.push({ row, column });
		}
	}

	return cells;
};

export const getRowNumberFromDayjs = (day: Dayjs) => {
	return day.hour() * 12 + Math.floor(day.minute() / 5) + 3;
};

export const getLocalDayjsFromDayjs = (day: Dayjs) => {
	return day.add(3, "hour");
};

export const getLocalISOStringFromISOString = (date: string) => {
	return dayjs(date).add(3, "hour").toISOString();
};

export const generateColumns = (start: number, end: number) => {
	const columns = [];

	for (let i = start; i <= end; i++) {
		if (i % 2 === 0) {
			columns.push(i);
		}
	}

	return columns;
};

export const getDayjsFromRowAndColumn = (row: number, column: number, currentDay: Dayjs) => {
	const day = currentDay.startOf("week").add(Math.floor(column / 2) - 1, "day");
	const hour = Math.floor((row - 3) / 12);
	const minute = (row - 3) % 12 * 5;

	// return getLocalDayjsFromDayjs(day.hour(hour).minute(minute));
	return day.hour(hour).minute(minute);
};

export const isCalendarEntryInCurrentWeek = (calendarEntry: CalendarEntry, currentDay: Dayjs) => {
	return (
		dayjs(calendarEntry.startTime) > getSundayFromCurrentWeek(currentDay).subtract(3, "hour") &&
		dayjs(calendarEntry.startTime) < getSaturdayFromCurrentWeek(currentDay).subtract(3, "hour") &&
		dayjs(calendarEntry.endTime) < getSaturdayFromCurrentWeek(currentDay).subtract(3, "hour") &&
		dayjs(calendarEntry.endTime) > getSundayFromCurrentWeek(currentDay).subtract(3, "hour") &&
		dayjs(calendarEntry.startTime) < dayjs(calendarEntry.endTime)
	);
};