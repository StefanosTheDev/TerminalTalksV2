import ElevenLabsPlayer from '@/app/_components/learn/ElevenLabsPlayer';
import Footer from '@/app/_components/learn/Footer';
import Header from '@/app/_components/learn/Header';
import SideNav from '@/app/_components/learn/SideNav';
import { fetchCourse } from '@/app/_lib/services/utilService';
import { notFound } from 'next/navigation';

export default async function ViewCourse({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const course = await fetchCourse(slug);
  if (!course) {
    return notFound();
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header lectures={course.lectures} />

      <div className="flex h-[calc(100vh-8rem)]">
        <SideNav courseTitle={course.title} lectures={course.lectures} />
        <ElevenLabsPlayer lectures={course.lectures} />
      </div>

      <Footer lectures={course.lectures} />
    </div>
  );
}
