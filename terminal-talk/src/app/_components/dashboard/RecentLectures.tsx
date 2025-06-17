export default function RecentLectures({
  children,
}: {
  children: React.ReactNode;
}) {
  // Take this information and Render it from the props.
  // Style it here as well.
  return (
    <div className="recent-lectures">
      <h1>Recent Lectures</h1>
      {children}
    </div>
  );
}
