// app/_components/dashboard/AccountStats.tsx
import styles from '@/app/_styles/accountStats.module.css';

interface StatBox {
  title: string;
  value: string;
}

const stats: StatBox[] = [
  { title: 'Total Lectures', value: '24' },
  { title: 'Listen Time', value: '47.2h' },
  { title: 'Completion', value: '89%' },
];

export default function AccountStats() {
  return (
    <div>
      <h1>Account Stats</h1>

      <div className={styles.container}>
        {stats.map((s, i) => (
          <div key={i} className={styles.box}>
            <div className={styles.boxTitle}>{s.title}</div>
            <div className={styles.boxValue}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
