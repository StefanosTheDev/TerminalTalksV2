import { redirect } from 'next/navigation';

export default function DashboardPage() {
  return redirect('/dashboardV2/chat');
}
