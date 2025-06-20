import styles from '@/app/_styles/dashboard.module.css'; // adjust path if needed
import LectureCard from '../../_components/dashboard/LectureCard';
import QuickAction from '../../_components/dashboard/QuickActions';
import RecentLectures from '../../_components/dashboard/RecentLectures';
import AccountStats from '../../_components/dashboard/AccountStats';
import Link from 'next/link';
import { requireAuthUser } from '../../_lib/auth/nextAuth';
import { fetchAccountLectures } from '../../_lib/services/accountService';
export default async function OverView() {
  // 2. RE-use same helper to grab the user object
  const { id, name } = await requireAuthUser();

  // 3. Fetch only data you need in parallel.
  const lectureInfo = await fetchAccountLectures(id);
  lectureInfo.map((val, index) => {
    console.log('PRINT ');
    console.log(val, index);
  });
  return (
    <div className="test">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}> Welcome {name}</h1>
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
