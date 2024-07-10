import { useGetFilteredCalendarEntriesQuery } from "../redux/api/calendaurusApi";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentSelectedDate } from "../redux/slices/dateSlice";
import { selectTitle, selectTypes } from "../redux/slices/filterSlice";
import { selectCalendarEntry } from "../redux/slices/modalSlice";
import { selectUser } from "../redux/slices/userSlice";
import {
	getWeekDaysFromCurrentWeek,
	generateCellsList,
	getSundayFromCurrentWeek,
	getSaturdayFromCurrentWeek,
	generateColumns,
	isCalendarEntryInCurrentWeek,
} from "../utils";
import DayHeader from "./DayHeader";
import EmptyCell from "./EmptyCell";
import EventCard from "./EventCard";
import HourDisplay from "./HourDisplay";

const WeekCalendar = () => {
	const calendarEntry = useAppSelector(selectCalendarEntry);
	const currentSelectedDate = useAppSelector(selectCurrentSelectedDate);
	const types = useAppSelector(selectTypes);
	const title = useAppSelector(selectTitle);

	const weekDays = getWeekDaysFromCurrentWeek(currentSelectedDate);

	const hours = Array.from({ length: 23 }, (_, i) => i + 1);

	const emptyCells = generateCellsList(2, 290, 3, 15);

	const user = useAppSelector(selectUser);

	const { data: calendarEntries, isSuccess: calendarEntriesIsSuccess } =
		useGetFilteredCalendarEntriesQuery(
			{
				token: user.token,
				filter: {
					types: types,
					startTime: getSundayFromCurrentWeek(currentSelectedDate)
						.toDate()
						.toISOString(),
					endTime: getSaturdayFromCurrentWeek(currentSelectedDate)
						.toDate()
						.toISOString(),
				},
			},
			{
				skip: user.token === "",
			}
		);

	const columns = generateColumns(1, 14);

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				// width: "calc(100% - 3px)",
				display: "grid",
				gridTemplateColumns: "calc(9%) repeat(7, 1px calc(13% - 1px))",
				gridTemplateRows: "100px 1px repeat(288, 5px)",
				overflowY: "scroll",
			}}
		>
			{columns.map((column, index) => {
				return (
					<div
						key={"column-" + index}
						style={{
							gridRowStart: "1",
							gridRowEnd: "-1",
							gridColumn: `${column}`,
							backgroundColor: "var(--light-gray)",
						}}
					/>
				);
			})}
			<div
				style={{
					gridRow: `2`,
					gridColumnStart: "1",
					gridColumnEnd: "-1",
					backgroundColor: "var(--light-gray)",
				}}
			/>

			{weekDays.map((day, index) => {
				return <DayHeader key={"day-" + index} date={day} />;
			})}

			{hours.map((hour, index) => {
				return <HourDisplay key={"hour-" + index} hour={hour} />;
			})}

			{emptyCells.map((cell, index) => {
				return <EmptyCell key={"empty-cell-" + index} cell={cell} />;
			})}

			{calendarEntriesIsSuccess &&
				calendarEntries
					.filter((calendarEntry) => {
						return calendarEntry.title
							.toLowerCase()
							.includes(title.toLowerCase());
					})
					.map((calendarEntry, index) => {
						return (
							<EventCard
								key={"event-card-" + index}
								calendarEntry={calendarEntry}
							/>
						);
					})}

			{isCalendarEntryInCurrentWeek(
				calendarEntry,
				currentSelectedDate
			) && <EventCard calendarEntry={calendarEntry} />}
		</div>
	);
};

export default WeekCalendar;
