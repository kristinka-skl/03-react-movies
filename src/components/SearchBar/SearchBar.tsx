import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProp {
  onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProp) {
  const handleSubmit = (formData: FormData) => {
    const topic = formData.get("query") as string;
    if (topic === "") {
      toast("Please enter your search query");
      return;
    }
    onSubmit(topic.trim());
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className="copy">
          <a
            className={styles.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <span> and </span>
          <a
            href="https://www.linkedin.com/in/skliarchuk-khrystyana-314052176"
            target="_blank"
            rel="noopener noreferrer"
          >
            Skliarchuk Kristinka
          </a>
        </div>

        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
