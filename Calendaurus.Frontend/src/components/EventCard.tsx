import dayjs from "dayjs";
import { CalendarEntry } from "../types";
import { getIndexOfDayInWeek, getRowNumberFromDayjs } from "../utils";
import { useAppDispatch } from "../redux/hooks";
import { setCalendarEntry, setIsOpen } from "../redux/slices/modalSlice";

type Props = {
	calendarEntry: CalendarEntry;
};

const EventCard = (props: Props) => {
	const dispatch = useAppDispatch();

	const rowStart = getRowNumberFromDayjs(
		dayjs(props.calendarEntry.startTime)
	);
	const rowEnd = getRowNumberFromDayjs(dayjs(props.calendarEntry.endTime));
	const column = getIndexOfDayInWeek(dayjs(props.calendarEntry.startTime));

	const difference = rowEnd - rowStart;

	const handleOnClick = () => {
		dispatch(setCalendarEntry(props.calendarEntry));

		dispatch(setIsOpen(true));
	};

	return (
		<div
			style={{
				gridRowStart: `${rowStart}`,
				gridRowEnd: `${rowEnd}`,
				gridColumn: `${column}`,
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				gap: "10px",
				borderRadius: "5px",
				backgroundColor: `${
					props.calendarEntry.color ?? "var(--blue-primary)"
				}`,
				cursor: "pointer",
			}}
			onClick={handleOnClick}
		>
			{difference >= 6 && (
				<div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
					{props.calendarEntry.title}
				</div>
			)}

			{/* {difference >= 12 && (
				<div style={{ fontSize: "1rem" }}>
					{props.calendarEntry.type}
				</div>
			)} */}
		</div>
	);
};

export default EventCard;
