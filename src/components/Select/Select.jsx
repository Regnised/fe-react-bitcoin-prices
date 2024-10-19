import './Select.css';

export default function SelectInput({
  options,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <select
      id="interval-select"
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
