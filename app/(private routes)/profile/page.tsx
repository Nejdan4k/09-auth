import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';
import type { User } from '@/types/user';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();

  if (!user) {
    return {
      title: 'Profile | NoteHub',
      description: 'View your profile on NoteHub',
    };
  }

  return {
    title: `${user.username} – My NoteHub Profile`,
    description: `Check out ${user.username}'s profile on NoteHub`,
    openGraph: {
      title: `Profile of ${user.username}`,
      description: `Check out ${user.username}'s profile on NoteHub`,
      url: 'https://09-auth-phi-teal.vercel.app/profile',
      images: [
        {
          url: user.avatar || 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${user.username} Avatar`,
        },
      ],
    },
  };
}

export default async function ProfilePage() {
  let user: User | null = null;

  try {
    user = await getServerMe();
  } catch (error) {
    console.error('Error fetching user:', error);
  }

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>My Profile</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || '/avatar.png'}
            alt={`${user.username} Avatar`}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </main>
  );
}
