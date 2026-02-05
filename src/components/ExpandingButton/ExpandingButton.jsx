// CSS:
import styles from "./ExpandingButton.module.css";
// React:
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";




export default function ExpandingButton({icon,text,content}){

    const [expanded, setExpanded] = useState(false);


return (
  <section className={`${styles.component} ${expanded ? styles.expanded : styles.collapsed}`}>
    <button className={styles.expand} onClick={() => setExpanded(prev => !prev)}>
      <div>
        <img src={icon} className={styles.img}/>
        <span>{text}</span>
      </div>
      <MdExpandMore className={styles.icon}/>
    </button>

    <section className={styles.content}>{content}</section>
  </section>
);

} 