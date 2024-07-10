import { useState } from "react";

type Props = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput = (props: Props) => {
	const [hasFocus, setFocus] = useState(false);

	const handleOnFocus = () => {
		setFocus(true);
	};

	const handleOnBlur = () => {
		setFocus(false);
	};

	return (
		<input
			type="text"
			placeholder={"Search..."}
			value={props.value}
			onChange={props.onChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
			style={{
                width: "90%",
				padding: "10px",
				fontSize: "1rem",
                border: "none",
				borderBottom: hasFocus ? "1px solid var(--red-primary)" : "1px solid var(--gray)",
                outline: "none",
			}}
		/>
	);
};

export default SearchInput;
