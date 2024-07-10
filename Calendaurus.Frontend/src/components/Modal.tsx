import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
	removeCalendarEntry,
	selectCalendarEntry,
	setColor,
	setDescription,
	setEndTime,
	setIsOpen,
	setLocation,
	setStartTime,
	setTitle,
	setType,
} from "../redux/slices/modalSlice";
import TextInput from "./TextInput";
import ColorInput from "./ColorInput";
import DateTimeInput from "./DateTimeInput";
import dayjs from "dayjs";
import SelectInput from "./SelectInput";
import Button from "./Button";
import { selectToken } from "../redux/slices/userSlice";
import {
	useAddCalendarEntryMutation,
	useDeleteCalendarEntryMutation,
	useUpdateCalendarEntryMutation,
} from "../redux/api/calendaurusApi";
import { useEffect } from "react";

const Modal = () => {
	const dispatch = useAppDispatch();

	const calendarEntry = useAppSelector(selectCalendarEntry);
	const token = useAppSelector(selectToken);

	const [
		addCalendarEntry,
		{
			isSuccess: addCalendarEntryIsSuccess,
			isError: addCalendarEntryIsError,
		},
	] = useAddCalendarEntryMutation();

	const [
		updateCalendarEntry,
		{
			isSuccess: updateCalendarEntryIsSuccess,
			isError: updateCalendarEntryIsError,
		},
	] = useUpdateCalendarEntryMutation();

	const [
		deleteCalendarEntry,
		{
			isSuccess: deleteCalendarEntryIsSuccess,
			isError: deleteCalendarEntryIsError,
		},
	] = useDeleteCalendarEntryMutation();

	const handleSave = () => {
		if (
			calendarEntry.startTime === "" ||
			calendarEntry.endTime === "" ||
			calendarEntry.title === ""
		) {
			alert("Please fill in all required fields");
			return;
		}

		if (
			dayjs(calendarEntry.startTime).isBefore(dayjs()) ||
			dayjs(calendarEntry.endTime).isBefore(dayjs())
		) {
			alert("Start time and end time must be in the future");
			return;
		}

		if (!calendarEntry.id) {
			addCalendarEntry({ token, calendarEntry });
		} else {
			updateCalendarEntry({ token, calendarEntry });
		}
	};

	const handleDelete = () => {
		if (!calendarEntry.id) return;

		deleteCalendarEntry({ token: token, id: calendarEntry.id });
	};

	const handleOutsideClick = () => {
		dispatch(removeCalendarEntry());
		dispatch(setIsOpen(false));
	};

	useEffect(() => {
		if (addCalendarEntryIsSuccess) {
			alert("Calendar entry added successfully");
			dispatch(removeCalendarEntry());
			dispatch(setIsOpen(false));
			return;
		}

		if (updateCalendarEntryIsSuccess) {
			alert("Calendar entry updated successfully");
			dispatch(removeCalendarEntry());
			dispatch(setIsOpen(false));
			return;
		}

		if (deleteCalendarEntryIsSuccess) {
			alert("Calendar entry deleted successfully");
			dispatch(removeCalendarEntry());
			dispatch(setIsOpen(false));
			return;
		}

		if (addCalendarEntryIsError) {
			alert("Error adding calendar entry");
			return;
		}

		if (updateCalendarEntryIsError) {
			alert("Error updating calendar entry");
			return;
		}

		if (deleteCalendarEntryIsError) {
			alert("Error deleting calendar entry");
			return;
		}
	}, [
		addCalendarEntryIsSuccess,
		addCalendarEntryIsError,
		updateCalendarEntryIsSuccess,
		updateCalendarEntryIsError,
		deleteCalendarEntryIsSuccess,
		deleteCalendarEntryIsError,
	]);

	return (
		<>
			<div
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
				}}
				onClick={handleOutsideClick}
			/>
			<div
				style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "30px",
						backgroundColor: "white",
						padding: "20px",
						borderRadius: "10px",
					}}
				>
					<div
						style={{
							display: "flex",
							gap: "30px",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
							}}
						>
							<div
								style={{
									fontSize: "1.5rem",
									fontWeight: "bold",
								}}
							>
								{!calendarEntry.id ? "Add Event" : "Edit Event"}
							</div>

							<DateTimeInput
								label={"Start Time"}
								minDateTime={dayjs().toISOString()}
								defaultValue={calendarEntry.startTime}
								onChange={(date) =>
									dispatch(
										setStartTime(date?.toISOString() || "")
									)
								}
							/>

							<TextInput
								label={"Title"}
								value={calendarEntry.title}
								onChange={(e) =>
									dispatch(setTitle(e.target.value))
								}
							/>

							<TextInput
								label={"Description"}
								value={calendarEntry.description ?? ""}
								onChange={(e) =>
									dispatch(setDescription(e.target.value))
								}
							/>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
							}}
						>
							<ColorInput
								label={"Color"}
								value={calendarEntry.color ?? "#e5173f"}
								onChange={(e) =>
									dispatch(setColor(e.target.value))
								}
							/>

							<DateTimeInput
								label={"End Time"}
								minDateTime={
									calendarEntry.startTime === ""
										? dayjs().toISOString()
										: calendarEntry.startTime
								}
								defaultValue={calendarEntry.endTime}
								onChange={(date) =>
									dispatch(
										setEndTime(date?.toISOString() || "")
									)
								}
							/>

							<SelectInput
								label={"Type"}
								value={calendarEntry.type}
								onChange={(e) =>
									dispatch(setType(e.target.value))
								}
							/>

							<TextInput
								label={"Location"}
								value={calendarEntry.location ?? ""}
								onChange={(e) =>
									dispatch(setLocation(e.target.value))
								}
							/>
						</div>
					</div>

					<div
						style={{
							display: "flex",
							gap: "200px",
						}}
					>
						<Button
							text={"SAVE"}
							textColor={"--white"}
							backgroundColor={"--red-primary"}
							hoverBackgroundColor={"--red-secondary"}
							onClick={handleSave}
						/>

						{calendarEntry.id && (
							<Button
								text={"DELETE"}
								textColor={"--white"}
								backgroundColor={"--red-primary"}
								hoverBackgroundColor={"--red-secondary"}
								onClick={handleDelete}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
