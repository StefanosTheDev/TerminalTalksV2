// next-auth.d.ts

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession()` and `getSession()`
   */
  interface Session extends DefaultSession {
    user: {
      /** The user's database ID */
      id: string;
    } & DefaultSession['user'];
  }

  /**
   * (Optional) If you need to type `user` in callbacks
   */
  interface User {
    id: string;
    // add other custom properties here if you like
  }
}
