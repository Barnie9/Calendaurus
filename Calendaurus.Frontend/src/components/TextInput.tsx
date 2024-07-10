type Props = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = (props: Props) => {
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
            <input
                type="text"
                name={props.label.toLowerCase()}
                placeholder={`Enter ${props.label.toLowerCase()} here...`}
                value={props.value}
                onChange={props.onChange}
                style={{
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid var(--gray)",
                }}
            />
        </div>
    );
};

export default TextInput;