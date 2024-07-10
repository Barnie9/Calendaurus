import CalendaurusLogo from "../assets/CalendaurusLogo.svg";
import Button from "./Button";
import {
	IconChevronLeft,
	IconChevronRight,
	IconLogout,
} from "@tabler/icons-react";
import IconButton from "./IconButton";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	selectCurrentSelectedDate,
	setCurrentSelectedDate,
} from "../redux/slices/dateSlice";
import dayjs from "dayjs";
import {
	getSundayFromNextWeek,
	getSundayFromPastWeek,
} from "../utils";
import { useMsal } from "@azure/msal-react";
import { removeUser, selectUser } from "../redux/slices/userSlice";
import { removeCalendarEntry, setIsOpen } from "../redux/slices/modalSlice";

const Navbar = () => {
	const { instance } = useMsal();

	const dispatch = useAppDispatch();

	const currentSelectedDate = useAppSelector(selectCurrentSelectedDate);

	const user = useAppSelector(selectUser);

	const logout = () => {
		dispatch(removeUser());

		instance.logoutPopup();
	};

	return (
		<div
			style={{
				display: "flex",
				height: "100%",
				width: "calc(100% - 20px)",
				padding: "0 10px",
				borderBottom: "1px solid var(--light-gray)",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "20%",
				}}
			>
				<img
					src={CalendaurusLogo}
					alt="Calendaurus Logo"
					style={{
						width: "90%",
					}}
				/>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "35%",
					gap: "10px",
				}}
			>
				<IconButton
					onClick={() =>
						dispatch(
							setCurrentSelectedDate(
								getSundayFromPastWeek(currentSelectedDate)
							)
						)
					}
				>
					<IconChevronLeft stroke={2} />
				</IconButton>
				<IconButton
					onClick={() =>
						dispatch(
							setCurrentSelectedDate(
								getSundayFromNextWeek(currentSelectedDate)
							)
						)
					}
				>
					<IconChevronRight stroke={2} />
				</IconButton>
				<Button
					text="TODAY"
					textColor="--red-primary"
					backgroundColor="--white"
					hoverBackgroundColor="--light-gray"
					onClick={() => dispatch(setCurrentSelectedDate(dayjs()))}
				/>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					width: "15%",
				}}
			>
				<Button
					text="NEW EVENT"
					textColor="--white"
					backgroundColor="--red-primary"
					hoverBackgroundColor="--red-secondary"
					onClick={() => {
						dispatch(removeCalendarEntry());
						dispatch(setIsOpen(true))
					}}
				/>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					height: "100%",
					width: "30%",
					gap: "10px",
				}}
			>
				<div
					style={{
						color: "var(--gray)",
						fontSize: "1.5rem",
						cursor: "default",
					}}
				>
					{user.name}
				</div>
				<IconButton onClick={logout}>
					<IconLogout stroke={2} />
				</IconButton>
			</div>
		</div>
	);
};

export default Navbar;
