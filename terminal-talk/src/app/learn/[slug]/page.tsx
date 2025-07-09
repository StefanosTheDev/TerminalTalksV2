export default function ViewCourse({ params }: { params: { slug: string } }) {
  // Get The Title Of The Course.
  const { slug } = params;

  // Okay So Now I have The Course I want.

  // Step 1: Query The Course Information From The Slug.
  // Now I need
  // So I am going to now Query The Course To Render & Show The First One
  // If The User Clicks The Next Button. I will then allow them to traverse to the next Lecture on the list

  return (
    <>
      <div className="view-course">
        {slug}
        <h1> Course TITLE</h1>
        <p> COURSE DESCRIPTION</p>
        <p> Course Time Length</p>
        <p> Course Level </p>
      </div>
    </>
  );
}
