// CSS:
import styles from './Wallet.module.css';
// Auth/info:
import { useAuth } from '../../context/AuthProvider';
import { useDeposit } from '../../context/DepositProvider';
import { useWithdrawal } from '../../context/WithdrawalProvider';
import { formatCurrency } from '../../api/utils';
// Icons
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";

export default function Wallet() {
  
  const {user} = useAuth();
  const {setIsVisible} = useDeposit();
  const {setIsVisible: setWithdrawalIsVisible} = useWithdrawal();
  
  return (
    <section className={styles.finance}>
      <div className={styles.balance}>
        <span className={styles.balanceLabel}>Saldo</span>
        <span className={styles.balanceAmount}>{formatCurrency(user?.balance || 0)}</span>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={() => setWithdrawalIsVisible(true)}>
          <IoArrowDownCircleOutline className={styles.icon} />
          <span>Sacar</span>
        </button>
        <button className={`${styles.actionButton} ${styles.depositButton}`} onClick={() => setIsVisible(true)}>
          <IoArrowUpCircleOutline className={styles.icon} />
          <span>Depositar</span>
        </button>
      </div>
    </section>
  )
}