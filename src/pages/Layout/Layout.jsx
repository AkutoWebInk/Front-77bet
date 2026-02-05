// CSS:
import styles from './Layout.module.css';
// Components:
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Deposit from '../../components/Deposit/Deposit';
import Withdrawal from '../../components/Withdrawal/Withdrawal';
//Outlet:
import { Outlet } from "react-router-dom";
// Warnings and notifications:
import Warning from '../../components/Warning/Warning';
import { useWarning } from '../../context/WarningProvider';
import { useDeposit } from '../../context/DepositProvider';
import { useWithdrawal } from '../../context/WithdrawalProvider';


export default function Layout() {

  const {warning} = useWarning();
  const {isVisible, setIsVisible} = useDeposit();
  const {isVisible: isWithdrawalVisible, setIsVisible: setWithdrawalIsVisible} = useWithdrawal();

  return (
    <section className={styles.layout}>
      <Header />
      {warning && <Warning />}
      <Deposit visible={isVisible} onClose={() => setIsVisible(false)} />
      <Withdrawal visible={isWithdrawalVisible} onClose={() => setWithdrawalIsVisible(false)} />

      <section className={styles.content}>
        <Outlet />
      </section>
      
      <Navbar />
      <Footer />

    </section>
  );
}