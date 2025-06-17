import styles from '@/app/_styles/dashboard.module.css'; // adjust path if needed
import LectureCard from '@/app/_components/dashboard/LectureCard';
import QuickAction from '@/app/_components/dashboard/QuickActions';
import RecentLectures from '@/app/_components/dashboard/RecentLectures';
import { checkAuthenticated } from '@/app/_lib/util/util';
import AccountStats from '@/app/_components/dashboard/AccountStats';
import Link from 'next/link';
export default async function OverView() {
  const { name } = await checkAuthenticated();

  return (
    <div className="test">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}> Dashboard</h1>
          <p className={styles.overDescription}>
            Here's what's happening with your lectures
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className={`${styles.btn} ${styles.btnSecondary}`}
        >
          Create Lecture
        </Link>{' '}
      </header>
      {/* RED Box: Account Stats */}
      <div className={styles.redBox}>
        <AccountStats />
      </div>
      {/* GREEN Box: Quick Actions */}
      <div className={styles.greenBox}>
        <QuickAction />
      </div>
      {/* BLUE Box: Recent Lectures */}
      <div className={styles.blueBox}>
        <RecentLectures>
          <LectureCard />
          <LectureCard />
          <LectureCard />
        </RecentLectures>
      </div>
    </div>
  );
}
