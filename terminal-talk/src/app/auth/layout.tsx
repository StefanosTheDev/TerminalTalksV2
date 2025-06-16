import styles from '@/app/_styles/authForm.module.css';

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.authbackground}>
      <main className={styles.container}>{children}</main>
    </div>
  );
}
