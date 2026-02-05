// CSS
import styles from './Profile.module.css';

// React
import { useAuth } from "../../context/AuthProvider";

// Assets
import profilePic from './assets/user.png';
import background from './assets/lava.png';

// Components
import { VIP } from '../../components/VIP/VIP.jsx';
import ExpandingButton from '../../components/ExpandingButton/ExpandingButton';
import Wallet from '../../components/Wallet/Wallet';
import TransactionsHistory from '../../components/Transactions/Transactions';
import ClaimCoupons from '../../components/Coupons/Coupons';
import Settings from '../../components/Settings/Settings';

// Icons
import cashFlow from './assets/cash-flow.png';
import invitation from './assets/invitation.png';
import coupon from './assets/coupon.png';
import support from './assets/support.png';
import settings from './assets/user.png'; // Using user icon as placeholder for settings
import { CiLogout } from "react-icons/ci";

export default function Profile() {
  const { user, logout } = useAuth();   // get user from global auth
  
  return (
    <section className={styles.page}>
      <img src={background} className={styles.background} />

      <div className={styles.desktopLayout}>
        <div className={styles.leftColumn}>
          <section className={styles.profile}>
            <div className={styles.profileHeader}>
                <img src={profilePic} className={styles.profilePic} />
                <div className={styles.mainInfo}>
                    <div className={styles.profileInfo}>
                        <span className={styles.userName}>{user?.firstName} {user?.lastName}</span>
                        <p className={styles.userId}>ID: {user?.id}</p>
                    </div>
                </div>
            </div>
          </section>

          <Wallet />

          <VIP vip={user?.vip} />
          
          <button className={`${styles.logout} ${styles.desktopOnlyLogout}`} onClick={() => logout()}>
            <CiLogout className={styles.icon} />
            <span>Sair</span>
          </button>
        </div>

        <div className={styles.rightColumn}>
          <ExpandingButton icon={settings} text="Configurações" content={<Settings />} />
          <ExpandingButton icon={cashFlow} text="Relatórios" content={<TransactionsHistory />} />
          <ExpandingButton icon={invitation} text="Convide & Ganhe" />
          <ExpandingButton icon={coupon} text="Resgatar Cupom" content={<ClaimCoupons />} />
          <ExpandingButton icon={support} text="Suporte" />
          
          <button className={`${styles.logout} ${styles.mobileOnlyLogout}`} onClick={() => logout()}>
            <CiLogout className={styles.icon} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </section>
  );
}
