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
    <div className="dashboard-main">
      <h1>Welcome Back {name}</h1>
      <p>Here's what's happening with your lectures</p>
      <Link href="/dashboard/create">Create Lecture </Link>
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
