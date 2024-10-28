import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";
import { FormEvent, useRef } from "react";

interface SearchBarProps {
  onSubmit: (searchTerm: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = inputRef.current?.value.trim();

    if (!searchTerm) {
      toast.error("Tell me what do you want to search!", {
        style: {
          backgroundColor: "#ace1af",
          color: "#1b4d3e",
        },
        duration: 3000,
        position: "top-right",
      });
      inputRef.current?.focus();
      return;
    }

    onSubmit(searchTerm);
  };

  return (
    <header className={s.header}>
      <Toaster />
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          type="text"
          className={s.inputField}
          autoComplete="off"
          ref={inputRef}
          placeholder="Search images..."
        />
        <button type="submit" className={s.searchBtn}>
          Search
        </button>
      </form>
    </header>
  );
}
