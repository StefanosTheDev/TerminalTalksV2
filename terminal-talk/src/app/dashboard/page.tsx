import { checkAuthenticated } from '@/app/_lib/util/util';
export default async function Dashboard() {
  const { name, email, image, id } = await checkAuthenticated();
  return (
    <div className="dashboard-main">
      <h1> Welcome Back {name}</h1>
      <p> Here's what's happening with your lectures </p>
    </div>
  );
}
