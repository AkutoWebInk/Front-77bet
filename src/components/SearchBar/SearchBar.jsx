import styles from './SearchBar.module.css';
import { CiSearch } from "react-icons/ci";

export default function SearchBar({placeholder='Search', value, onChange}) {
  return (
    <section className={styles.searchSection}>
        
        <input 
          type="text" 
          className={styles.searchInput} 
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        
        <button className={styles.searchButton} >
            <CiSearch className={styles.searchIcon}/>
        </button>

    </section>
  );
}