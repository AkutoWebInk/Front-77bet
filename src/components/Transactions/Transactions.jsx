import { useEffect, useState } from "react";
import styles from "./Transactions.module.css";
import { useAuth } from "../../context/AuthProvider";
import { getTransactionsHistory } from "../../api/services/finance";
import { formatCurrency } from "../../api/utils";


function TransactionCard({ data }) {
  const isDeposit = data.type === 'deposit';
  
  // Map database status to frontend visual states
  const rawStatus = data.status || 'pending';
  let status = rawStatus.toLowerCase();
  
  if (status === 'confirmed') status = 'approved';
  if (status === 'expired') status = 'failed';
  
  const statusLabel = rawStatus === 'confirmed' ? 'CONCLUÍDO' : 
                      rawStatus === 'expired' ? 'EXPIRADO' : 
                      rawStatus.toUpperCase();

  return (
    <section className={styles.TransactionCard}>
      <div className={styles.cardHeader}>
        <span className={styles.txId}># {data.id}</span>
        <span className={`${styles.txStatus} ${styles[status]}`}>
          {statusLabel}
        </span>
      </div>
      
      <div className={styles.cardBody}>
        <div className={styles.txInfo}>
          <p className={styles.txLabel}>Valor</p>
          <p className={styles.txAmount}>{formatCurrency(data.amount)}</p>
        </div>
        
        <div className={styles.txInfo}>
          <p className={styles.txLabel}>Tipo</p>
          <p className={styles.txType}>{isDeposit ? 'Depósito' : 'Saque'}</p>
        </div>

        <div className={styles.txInfo}>
          <p className={styles.txLabel}>Provedor</p>
          <p className={styles.txProvider}>{data.provider}</p>
        </div>
      </div>
    </section>
  );
}



export default function TransactionsHistory() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("withdrawn");

  useEffect(() => {
    async function fetchHistory() {
      if (!user?.id) return;
      
      setLoading(true);
      try {
        const response = await getTransactionsHistory(user.id);
        console.log("Transaction History Response:", response);
        if (response && response.status === 200) {
          const sortedData = (response.data || []).sort((a, b) => b.id - a.id);
          setHistory(sortedData);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [user?.id]);

  const filteredData = history.filter(tx => {
    if (tab === 'withdrawn') return tx.type === 'withdraw';
    return tx.type === 'deposit';
  });
  
  return (
    <section className={styles.component}>
      <div className={styles.buttons}>
        <button 
          onClick={() => setTab("withdrawn")} 
          className={`${styles.b1} ${tab === "withdrawn" ? styles.activeTab : ""}`}
        >
          Saques
        </button>

        <button 
          onClick={() => setTab("deposits")} 
          className={`${styles.b2} ${tab === "deposits" ? styles.activeTab : ""}`}
        >
          Depósitos
        </button>
      </div>

      <div className={styles.transactions}>
        {loading ? (
          <p className={styles.loadingText}>Carregando histórico...</p>
        ) : filteredData.length > 0 ? (
          filteredData.map((tx) => (
            <TransactionCard key={tx.id} data={tx} />
          ))
        ) : (
          <p className={styles.noDataText}>Nenhuma transação encontrada.</p>
        )}
      </div>
    </section>
  );
}
