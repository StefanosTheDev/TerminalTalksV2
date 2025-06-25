// Create User
import prisma from '@/app/_lib/prisma';

// GET ALL ACCOUNTS
export async function getAllAccounts() {
  const accounts = await prisma.user.findMany({});
  return accounts;
}

// export async function delet
// export async function getAccountById({ id }: { id: string }) {
//   const account = await prisma.user.findUnique({
//     where: {
//       id,
//     },
//   });
//   if (!account) {
//     throw new Error('Account Not Found');
//   }
//   return account;
// }
// export async function deleteAccountById({ id }: { id: string }) {
//   const account = await prisma.user.delete({
//     where: {
//       id,
//     },
//   });
//   return account;
// }

// export async function fetchAccountLectures(userId: string) {
//   return prisma.lecture.findMany({
//     where: {
//       userId, // ← filter by the FK back to your User
//     },
//     orderBy: {
//       createdAt: 'desc', // newest first
//     },
//     select: {
//       id: true,
//       createdAt: true,
//       lecture: true,
//       // include other fields you need, e.g. `description: true`
//     },
//   });
// }
