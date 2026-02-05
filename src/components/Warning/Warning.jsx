// CSS:
import styles from './Warning.module.css';
import { useWarning } from '../../context/WarningProvider';
import { IoCheckmarkCircle, IoCloseCircle, IoInformationCircle, IoWarning } from 'react-icons/io5';

export default function Warning() {
    const { warning } = useWarning();

    if (!warning) return null;

    const icons = {
        success: <IoCheckmarkCircle className={styles.icon} />,
        error: <IoCloseCircle className={styles.icon} />,
        info: <IoInformationCircle className={styles.icon} />,
        warning: <IoWarning className={styles.icon} />
    };

    return (
        <section className={`${styles.component} ${styles[warning.type]}`}>
            <div className={styles.content}>
                {icons[warning.type] || icons.info}
                <span className={styles.message}>{warning.msg}</span>
            </div>
            <div className={styles.progress}></div>
        </section>
    );
}
