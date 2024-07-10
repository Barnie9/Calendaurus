import { useEffect, useState } from "react";
import { useGetAllEntryTypesQuery } from "../redux/api/calendaurusApi";
import { useAppDispatch } from "../redux/hooks";
import { setTypes } from "../redux/slices/filterSlice";
import Filter from "./Filter";
import { IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';

const Filters = () => {
	const dispatch = useAppDispatch();

	const [isHovered, setHovered] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const handleMouseEnter = () => {
		setHovered(true);
	};

	const handleMouseLeave = () => {
		setHovered(false);
	};

	const handleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	};

	const { data: entryTypes, isSuccess: entryTypesSuccess } =
		useGetAllEntryTypesQuery();

	useEffect(() => {
		if (entryTypesSuccess) {
			dispatch(setTypes(entryTypes));
		}
	}, [entryTypesSuccess, entryTypes]);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				width: "100%",
				gap: "10px",
			}}
		>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleDropdown}
				style={{
					display: "flex",
					height: "30px",
					width: "100%",
					fontSize: "1.3rem",
					borderRadius: "5px",
					backgroundColor: isHovered ? "var(--light-gray)" : "inherit",
					cursor: "pointer",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						width: "90%",
					}}
				>
					Types
				</div>

				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
						width: "10%",
					}}
				>
					{isDropdownOpen ? (
						<IconCaretUpFilled stroke={2} />
					) : (
						<IconCaretDownFilled stroke={2} />
					)}
				</div>
			</div>

			{isDropdownOpen && entryTypesSuccess &&
				entryTypes.map((entryType, index) => (
					<Filter key={"type-" + index} text={entryType} />
				))}
		</div>
	);
};

export default Filters;
