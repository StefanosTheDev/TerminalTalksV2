export default function RecentLectures({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="recent-lectures">
      <h1>Recent Lectures</h1>

      {children}
    </div>
  );
}
