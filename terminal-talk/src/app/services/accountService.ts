import { db } from '@/app/lib/firebase';
// Collection Names

export async function getAllUsers() {
  const snapshot = await db.collection('users').get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
console.log(getAllUsers);
