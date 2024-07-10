import { useGetAllEntryTypesQuery } from "../redux/api/calendaurusApi";

type Props = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectInput = (props: Props) => {
    const { data: options } = useGetAllEntryTypesQuery();

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
            <select
                name={props.label.toLowerCase()}
                value={props.value}
                onChange={props.onChange}
                style={{
                    padding: "10px",
                    fontSize: "1rem",
                    borderRadius: "5px",
                    border: "1px solid var(--gray)",
                }}
            >
                {options?.map((option) => (
                    <option key={"option-" + option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInput;