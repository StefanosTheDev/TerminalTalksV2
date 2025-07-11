Goal: Give me every course in the system. Plus if a user is signed in and is already enroleld in taht course. There personal progress / completed state.

// How primsa lets me do that.

// Step 1: Obviously Prisma will look through the entire course Table since thats what im quering.

// STep 2: Well do the Include: {lectures: }: When you hand me each course. also handme its related lecture rows so i dont need to query again.
// I had to switch the HandeClick Now To a Callback
// Return Title Of The Current Course.
// Return Title Of The Current Lecture
// Return Lesson Number Out Of Total For course.
// Have A Back To Dashboard Button Top Left.
