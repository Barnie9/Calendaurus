import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	selectCurrentSelectedDate,
	setCurrentSelectedDate,
} from "../redux/slices/dateSlice";
import Filters from "./Filters";
import SearchInput from "./SearchInput";
import { selectTitle, setTitle } from "../redux/slices/filterSlice";

const Sidebar = () => {
	const dispatch = useAppDispatch();

	const currentSelectedDate = useAppSelector(selectCurrentSelectedDate);
	const title = useAppSelector(selectTitle);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100%",
				width: "calc(100% - 23px)",
				padding: "0 10px",
				gap: "10px",
				borderRight: "1px solid var(--light-gray)",
				overflowY: "auto",
			}}
		>
			<DateCalendar
				showDaysOutsideCurrentMonth
				fixedWeekNumber={6}
				value={currentSelectedDate}
				onChange={(newValue) =>
					dispatch(setCurrentSelectedDate(newValue))
				}
				sx={{
					minHeight: "350px",
					width: "100%",
					"& .MuiPickersDay-root": {
						"&.Mui-selected": {
							backgroundColor: "var(--red-primary)",
							"&:hover": {
								backgroundColor: "var(--red-secondary)",
							},
							"&:focus": {
								backgroundColor: "var(--red-primary)",
							},
						},
					},
					"& .MuiPickersYear-yearButton": {
						"&.Mui-selected": {
							backgroundColor: "var(--red-primary)",
							"&:hover": {
								backgroundColor: "var(--red-secondary)",
							},
							"&:focus": {
								backgroundColor: "var(--red-primary)",
							},
						},
					},
				}}
			/>

			<SearchInput
				value={title}
				onChange={(e) => dispatch(setTitle(e.target.value))}
			/>

			<Filters />
		</div>
	);
};

export default Sidebar;
