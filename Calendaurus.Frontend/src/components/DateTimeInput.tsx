import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

type Props = {
	label: string;
    minDateTime: string;
    defaultValue: string;
    onChange: (date: Dayjs | null) => void;
};

const DateTimeInput = (props: Props) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "5px",
			}}
		>
			<label
				style={{
					fontSize: "1.2rem",
				}}
			>
				{props.label}
			</label>

			<DateTimePicker
				minDateTime={dayjs(props.minDateTime)}
				defaultValue={dayjs(props.defaultValue)}
				ampm={false}
                onChange={(date) => props.onChange(date)}
				slots={{
					actionBar: () => null,
				}}
			/>
		</div>
	);
};

export default DateTimeInput;
