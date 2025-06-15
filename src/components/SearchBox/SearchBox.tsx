import css from "./SearchBox.module.css"

interface SearchBoxPrors {
    value: string,
    onSearch: (query: string) => void
}

export default function SearchBox({ value, onSearch }: SearchBoxPrors) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };
    
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={value}
            onChange={handleChange}
        />
    );
};