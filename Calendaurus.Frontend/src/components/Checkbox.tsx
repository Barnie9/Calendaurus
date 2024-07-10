import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";

type Props = {
	checked: boolean;
	onClick: () => void;
};

const Checkbox = (props: Props) => {
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	return (
		<div
			onClick={props.onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "20px",
				width: "20px",
				border: `1px solid ${
					props.checked ? "white" : "var(--red-primary)"
				}`,
				borderRadius: "5px",
				backgroundColor: props.checked
					? isHovered
						? "var(--red-secondary)"
						: "var(--red-primary)"
					: isHovered
					? "var(--light-gray)"
					: "white",
				cursor: "pointer",
			}}
		>
			{props.checked && <IconCheck size={16} color="white" stroke={2} />}
		</div>
	);
};

export default Checkbox;
