## Claude Links Prototypes

Link:https://claude.ai/public/artifacts/46c7ea7a-b2cc-49ee-ae58-4183a57ffa0e
https://claude.ai/public/artifacts/f9668001-5a77-4194-b8e9-7eae0ed1fc0c
https://claude.ai/public/artifacts/2348d1ca-e188-4b1b-9272-3a20e9729aa9

## Database Design / Project Creation

// How to create a new Data base with PostGreSql Prisma..

Database Notes

// Params Notes On How This Works .. Dynamic Route Hhandlers.

// Defaults vs Non Needing For Defaults.

// Params vs Request.. Do i need the Request Not in someo fo these. I noticed i can get away with just the {params}

// Somethign to remember is that wyen you query the db in PRISMA the lectures arent included right away. you have to do something like {include; {lectures; true for example}}.. Why is that.

Also in my routes why am i destructing that object back to me whats the benefit?

Client --> API Route (route.ts) --> ✅ ZOD VALIDATION --> Service (Prisma) --> DB

Okay when I was doing the ParseObj problem. I coudlnt not have the optional option because it woudl be undefined. I chagned i to accep tthe default .user Option now.
THis is on the createAccount(parsedObj) line in my Route

and the role: z.string().default('user'),
This comes down to a Database issue. and having the optional is the right usecase. I tneeds to match the database.

---

Auth Process Email Password + Google Auth....
Google Sign in -> Next-Auth + Google Provider --> Automatically creates / updates users

Email Password Auth --> next-auth + Cred Provider -> manually check passwords...

Prisma `User ` model support:

- password: String? - Null for Google Users
- Email: String @unique - shared across both flows

Program Process Step By Step For Auth

- Add Credentials Providre (In Our Next Auth)
- Hash Passwords When Creating Users (email / password)
- Prevent Dupes Across Providers.

Credentialss Provider Next Auth
Module '"@/app/types/next-auth"' has no exported member 'User'.ts(2305)
import User AN isssue i had faced.
Perfect — thanks for sharing that. You're extending NextAuth types correctly, but the TypeScript error you're hitting:

sql
Copy
Edit
Module '"@/app/types/next-auth"' has no exported member 'User'.ts(2305)
happens because you’re trying to import User like a regular type, but it’s part of module augmentation, not a direct export.

✅ Here's the Fix:
You should not import User like this:

ts
Copy
Edit
import { User } from '@/app/types/next-auth'; // ❌ INVALID
Instead, you just use User directly without importing it — because TypeScript now knows what User means globally thanks to the module augmentation.

✅ Just use it like this:
ts
Copy
Edit
const [users, setUsers] = useState<User[]>([]);
✅ No import needed — User is already globally defined via the declare module 'next-auth' block in your .d.ts file.

Problem Solution
User not exported Don't import — just use it
TypeScript doesn’t see User Ensure .d.ts is loaded in project
Want to use a custom User for API responses Create and import your own type separately

=======================COMPONENT NOTES =============================
Aye Good Design For Auth Register / Login

// Build Out An Auth Layout.
-- What are the components of the Auth Layout

## How is the children prop work in tall this .

Buttons, Labels.

{ Label : Register}: Google Button, Email Password, Username.

- INput Labels.

{Label: Login } Google Button, Username, Password.

So the current approach is to Pass In The Layout We want to

Step 1: Devvelop a Div Box & Pass Tha tInto tThe Layout.

Different approaches to take when passing prop layouts etc. I can do a type or i can render the children .

he App-Router (Next.js 13+), you actually have two different files per “layout”:

layout.tsx

This is your React component that Next.js will use to wrap all child pages/routes in that folder.

It must be named exactly layout.tsx (or .jsx/.tsx) and live in the folder whose routes it should wrap (e.g. /app/auth/layout.tsx for everything under /auth/\*).

layout.module.css (or .module.scss)

This is your scoped CSS for that layout component.

You import it inside layout.tsx (or any component) as a CSS Module, so its rules only apply where you reference them.

Every folder where you want a different wrapper gets its own layout.tsx.

For styling, use CSS-Modules (.module.css/.module.scss) imported into that layout or its children so that styles don’t leak elsewhere.

Why this separation helps
layout.tsx controls structure (HTML, wrappers, React logic).

layout.module.css controls styles but only for that component and its tree.

That way, your login-screen CSS never “bleeds” into your root page or any unrelated route, and your root-level styles don’t accidentally re-style your auth pages.

\

// Here is a great workflow for Getting The Info From the Stylesheet.

Exactly—that’s the workflow:

Create a scoped stylesheet (e.g. AuthLayout.module.css or .scss) for any custom rules you need.

Import it in your component (or layout) with

ts
Copy
Edit
import styles from './AuthLayout.module.css';
Apply your module classes via className={styles.foo} (or styles['submit-btn']), and mix in Tailwind utilities however you like:

tsx
Copy
Edit

<div className={`${styles['login-container']} flex items-center justify-center`}>
  …
  <button className={`${styles['submit-btn']} mt-4`}>
    Sign In
  </button>
</div>
Keep your Tailwind config untouched—the module file is just regular CSS (or SASS), so you can even use @apply inside it to pull in Tailwind utilities.

That way you get both the convenience of scoped, collision-free component styles and the power of Tailwind’s utility classes in one place. Let me know if you’d like more examples!

Button Props dont have an Idioomatic way of passing Lablew. There are certain ways ot pass this in.

Another thing i need to define is how im going to do my CSS to HTMl conversion process.

Something I am weak at is understanding Props / Types in Typescript and when to use them in this.
I think a Godo refersher on Typescript my be necessary for how I will use it in React .
