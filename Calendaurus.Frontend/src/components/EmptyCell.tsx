import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectCurrentSelectedDate } from "../redux/slices/dateSlice";
import { removeCalendarEntry, setEndTime, setIsOpen, setStartTime } from "../redux/slices/modalSlice";
import { Cell } from "../types";
import { getDayjsFromRowAndColumn } from "../utils";

type Props = {
	cell: Cell;
};

const EmptyCell = (props: Props) => {
	const dispatch = useAppDispatch();

	const currentSelectedDate = useAppSelector(selectCurrentSelectedDate);

	const handleCellClick = () => {
		const startTime = getDayjsFromRowAndColumn(props.cell.row, props.cell.column, currentSelectedDate);
		const endTime = startTime.add(1, "hour");

		dispatch(removeCalendarEntry());

		dispatch(setStartTime(startTime.toISOString()));
		dispatch(setEndTime(endTime.toISOString()));

		dispatch(setIsOpen(true));
	};

	return (
		<div
			onClick={handleCellClick}
			style={{
				gridRow: `${props.cell.row}`,
				gridColumn: `${props.cell.column}`,
				height: "100%",
				width: "100%",
				cursor: "pointer",
			}}
		/>
	);
};

export default EmptyCell;
