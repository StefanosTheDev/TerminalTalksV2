Review // 3) Derive metrics
const completedCourses = dbUser.userCourses.filter(
(uc) => uc.completed
).length;
const inProgress = dbUser.userCourses.filter((uc) => !uc.completed).length;
const certificates = dbUser.certificates.length;

July 10th:

-
