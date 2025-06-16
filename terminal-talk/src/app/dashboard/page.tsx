import { getServerSession } from 'next-auth';
import { AuthOptions } from 'next-auth';
import { authOptions } from '../lib/nextAuth';
import { Session } from 'inspector/promises';

import OverView from './overiew';
export default async function Dashboard() {
  // Step 1: Get the SErver Session
  const session = await getServerSession(authOptions);

  // Verify Server Session is Exists.
  if (!session) {
    return <p> You must be llogged in etc </p>;
  }
  if (!session.user) {
    return <p> eehh</p>;
  }
  const { name } = session.user;
  // Returning The Data
  return (
    <>
      <OverView name={name}></OverView>
      {/* Conditional If CreateLecture Nav was clicked */}
      {/* RENDER CREATE COMPONENT */}
    </>
  );
}
// SErver COmponents ==>
