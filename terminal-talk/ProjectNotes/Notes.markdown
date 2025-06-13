## Things To Research / Learn More About

- How NextJS leverages Params {} & Dynamic Route Handlers etc.
- Params {} vs Request, I noticed ic an get away with just the {Params} at times
- Was theere a benefit to destructuring that object back to me in the routes. I believe
- Confirm With Elijah the way i stack the ZOD validation in the rout eis perfectly fine.
- Understand the importance of the default use in the database issue. and having it optional. I remember with the user we had an issue here.
- There was immense value in having a middleware function handle anytime there was a Create Account / Update With the Password involved to have it encrypt it. How do i do this in Next JS? . Also what is the altenrative to not do this? . When would would it be neccessary to implement the middleware.
- Error To Review:
  Module '"@/app/types/next-auth"' has no exported member 'User'.ts(2305)
  happens because you’re trying to import User like a regular type, but it’s part of module augmentation, not a direct export.
- How does the Button Prop Work What are the Props On The Button Route. Labels with this as well? This could be a great place to start researching.
- Difference between Re-usable components and pages.
- Review the layout.tsx and the finess of the doubl render why that error happened.

- Develop A Good Working Flow For Module.CSS and How I am going to design things. I prefer way more to do it this way. Overall this is design flow is something that I need to improve on. Maybe researching tailwind vs module a bi tmore and see if i can develop a glossary

- Something I am weak at is understanding Props / Types in Typescript and when to use them in this.
  I think a Godo refersher on Typescript my be necessary for how I will use it in React. Common types and things i have seen in TS could be helpfu.

- Look how I passed in an function as a Prop and how that connected bwtween the authForm and the login pages etc components. This was interesting.
- What is React Node?

- Elijahs Notes: - I've only had one layout.tsx in the past, inside the app/ directory. This layout would hold all of my Providers, including my Auth wrapper (to guard all of the private pages)

## Mental Notes

- If I am doing a data base query with Prisma, I have to leverage the `` Include {x: true}` to ensure that the value will come up in nested data structures. Great EX: is the users with lectures created. If you dont do that you just query normally. Add the Include you reference it and your good. Good thing to research is there other stuff like this?

## Authentication

- I believe the flow is Google Auth / Next Auth
- Mannually Check Cred Provider I need to completely research this flow
  Auth Process Email Password + Google Auth....Google Sign in -> Next-Auth + Google Provider --> Automatically creates / updates users
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

##Problem Solution

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
