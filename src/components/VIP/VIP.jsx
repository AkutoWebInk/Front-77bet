// CSS:
import styles from './VIP.module.css';
// VIP Icon
import vipIcon from './assets/vip.png';

export const VIP = ({ vip }) => {
    if (!vip) return null;

    const { current_level, next_level, progress, points } = vip;

    return (
        <section className={styles.component}>
            <div className={styles.header}>
                <img src={vipIcon} className={styles.vipIcon} alt="VIP" />
                <h3 className={styles.title}>Clube VIP</h3>
            </div>

            <div className={styles.levels}>
                <span className={styles.levelName}>{current_level}</span>
                <span className={styles.levelNameNext}>{next_level}</span>
            </div>

            <div className={styles.progressBarContainer} title={`Progresso: ${progress}% (${points} pts)`}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}>
                    <span className={styles.progressText}>{progress}%</span>
                </div>
            </div>
            
            <p className={styles.infoText}>
                Continue jogando para desbloquear recompensas exclusivas!
            </p>
        </section>
    );
};
