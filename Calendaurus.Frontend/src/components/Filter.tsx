import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { useAppDispatch } from "../redux/hooks";
import { addType, removeType } from "../redux/slices/filterSlice";

type Props = {
	text: string;
};

const Filter = (props: Props) => {
	const dispatch = useAppDispatch();

	const [checked, setChecked] = useState(true);

	useEffect(() => {
		if (checked) {
			dispatch(addType(props.text));
		} else {
			dispatch(removeType(props.text));
		}
	}, [checked]);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				height: "20px",
				gap: "10px",
			}}
		>
			<Checkbox checked={checked} onClick={() => setChecked(!checked)} />

			<div
				style={{
					color: "var(--gray)",
					fontSize: "1rem",
					cursor: "default",
				}}
			>
				{props.text}
			</div>
		</div>
	);
};

export default Filter;
