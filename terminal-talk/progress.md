Okay how should this feature work

Complete A-Z From When I click view course on this.

Loading Phase Of Course.

- Step 1: If The Course is not started (Has a 0 progress)... As a result if there is no progress we will say Start Course. If it's started. Show Continue Course. If it's completed at 100%. Show Completed Course.

- Step 2: Ensure The Stats Card Reflect The Progress / Status Updates Of The Course As They Dynamically Scale.

- Step 3: When I click the course. We will search by the slug and pass that into the page.tsx of the /learn endpoint. We will do a lookup of that course by the slug. On initial Load, we will see if that course exists as a userCourse . If not insert that into the userCourse object. and show the course.

- Step 4: Lectures Will Be Rendered By There index position of lectures in the course. So there will be a chapter section on the left that users can click to go through different lectures.

If a user clicks a course in the index and clicks mark as complete.

It will then add to the lectureProgress field. & that lecture will reflect as complete. We need to do this because we need a way to track when the user / logs in / out etc that that specific course is complete. So when we mark as complete we initiate that course as completed. Then add the appropriate percentage to the course. This will be calculated by the length. So if I have a total of 4 courses. It will add 25 %.

- Sudo Code Logic: - User clicks on any course and clicks mark as complete. Lecture progress is updated showing this lecture is completed. Percentage towards total course gets increased.

- When a user clicks all 4 lectures as makr as complete. there will be a Confettie show and a Modal saying certificate earned with a show . to this.

- The button on the previous section will only be availabe when the index position is greater than 0 since you cannot go previous back.

- When the course is at 100% the button in on the bottom right will say course completed! users will be able to navigate with the chapter section moving forward. This button will now be greyed out. with the course completed.

- Once a course is completed at 100% users will not be able to unwind / re-create theat course. part.
