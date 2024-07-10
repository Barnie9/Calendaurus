type Props = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ColorInput = (props: Props) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",

                justifyContent: "flex-end",
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
                type="color"
                name={props.label.toLowerCase()}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export default ColorInput;