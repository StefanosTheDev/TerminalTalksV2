## Dynamic Segments

place holders in your folder / file nam ethat NextJS swaps out for real values. when someone hits the url
Think of them as variables baked right into your route structure:

```
app/
  products/
    [id]/          ← [id] is the dynamic segment
      page.tsx

```

When a user visits /products/123, Next .js sees that `[id] `slot and passes { id: '123' } to your component or route handler.
If they visit /products/abc, you get `{ id: 'abc' }.` Same file, different data.

I can think of the Express way `req.params.id` is like the -> `{params.id}` in Next JS same flow. there.

Clarification on The `generateStaticParams() ` and how it plays with the everything else.

```
When To Choose
params -> serverSide / Route Handler
useparams --> client compp
```

## Catch Alll

```
Catch-all Segments
Dynamic Segments can be extended to catch-all subsequent segments by adding an ellipsis inside the brackets [...folderName].

For example, app/shop/[...slug]/page.js will match /shop/clothes, but also /shop/clothes/tops, /shop/clothes/tops/t-shirts, and so on.
```

```
Route	Example URL	params
app/shop/[...slug]/page.js	/shop/a	{ slug: ['a'] }
app/shop/[...slug]/page.js	/shop/a/b	{ slug: ['a', 'b'] }
app/shop/[...slug]/page.js	/shop/a/b/c	{ slug: ['a', 'b', 'c'] }
```

## Conclusion on This query params()

I can look at the URl for Query Params () search params part when i need to fetch from URL .
So the flow would be i click a button -> send ot filter by 15 it goes into the URL then my endpoint reads that URL ?={filterType} etc. then i fetch it. Just a different way of doign it.

## TLDR:

- params{} good for everything im doing params = "Give me the key so I can go get the exact thing I need" standard operations im doing with getting things out of the param.
- query params {} = let me teawk how i want to view / filter a thing. reference abovev.
- Generatic static params. can be used for popular preloaded pages . You already know certain IDs or slugs at build time and want their pages to load instantly (aka: pre-rendered HTML with no wait).
- Params {} vs Request. I noticed that in Next JS rout eHanlders you can ignore the Request object and jusee use params if all we need to get the ID or slug from the URL. So when we have ``/app/users/[id]/route.ts ` we can just use params. Next extracts it for you since we have that folder name. No need for req when your just getting param out of URL and not needing useSearch params for headers body cookies etc.
- We need to use the `Request (req) ` when we need to do access headers , POST body, insepct methods etc.: ✅ Use req when you need to read the body, query string, headers, or cookies.
- In Prisma there isnt a hook to like `pre-save` in mongoose where if you want to auto make sure passwords get encrypted on PUT / POST requests. You have few options to do in your own design. Service layers routes etc.

- Module Augmentation: instead of exporting types , your adding to the types of an existing libary like ``new auth` . Essentially your saying hey typescript when someone uses Session or User from next-auth. I want to add extra fields to it.

## TLDR: Authentication Notes.

- NextAuth (Import) is a TS interface provided by Next-Auth library. Helps shape the config object you pass into NextAuth() to setup auth. So we can get providers callback / session behavior.
- We cannot have our Session Provider as a Client Component then import that into the main layout. If not it will cause severe performance issues.
- Next-Auth really provides all those buttons of signIn, signOut. We leverage that across the app and reference the provider Credentials or lets Say Google..
- ` types / next-auth.d.ts file`
  Were essentially saying hey. when someone suses session.user or user i want to make it sure it includes id and other fields with correct typing. Now useSession() and getServer session will return a session with your updated types. WE DO NOT NEED TO IMPORT types/next-auth.d.ts its picked up globally. So now we can safely do `session.user.id` `session.user.email ` ` session.user.name`.
- NEXTAUTH_SECRET A long, random string (from a generator) Encrypts & secures session tokens
- NEXTAUTH_URL http://localhost:3000 or your live URL Tells providers where to redirect users after login/reg helps callbacks directing addresses (OAUTH)
- `useSession() vs getServerSession()` NextAuth
- useSession() (Client Only, After Hydration it runs, Use Cases: Show / Hide UI after Login. Not ideal for TRUE protection of routes).
- getServerSession() (Server only, Server Component / Route Handler. Before SSR/SSG , Gate Keep Fetch secure data. BEST FOR PROTECTING ROUTES)
- session?.user etc is necessary because wehave times were undefined is an opportunity.
- Key words : That we get from the Next-Auth.
  Key Purpose
  providers Login methods
  authorize() Verifies credentials login
  callbacks.jwt() Build/modify the token
  callbacks.session() Build/modify the session
  pages.signIn Where to redirect for login
  session.strategy Use JWT or DB for session
  events.signIn Trigger on login events

- module augmentation
-
- So there is a approach wif you . There is a whole consncept of using / keeping your app stateless and fast and easy to host by not trackign sessions in the DB. we are doing it in the JWT. So session: {streagy: jwt means store user session dat ain a secure cookie not he db. This is deal for modern apps. }
- The nextAuth from 'next-auth'. This is the file that connects from the NextAuth to the App Router. without this we wouldnt be able to call anything like signIn singOut or useSession.

## AUTHENTICATION DEV PROCESS:

Rebuild an Authentication Form Sign In Sing OUt To A Dashboard Page. . As Well As Build a Protected Route If needed.
For The Google Auth.

- Step 1: Get My Google Credentials.
  Step 2: Download npm install next-auth.
  Step 3: Create My nextAuth.ts File.
  step 4: Set Up our .route.ts in our API/AUTH/[...nextAuth] step5: Its here where were importing the nextAUth function which is the engine to everyting related to authentication. (signIn/Signout/Sessionetc.)
  Step5: We import the authOptions file we made into the NextAuth function. so we are proiding everyting and keeping it re0usable.
  Step 6: Export {handler asGET, handler As POST} This allows use to get all the methods we want.
  GET /api/auth/session → Gets session
  POST /api/auth/signin → Handles login
  POST /api/auth/signout → Handles logout
  GET /api/auth/callback/google → Handles OAuth callback
  These go through the handler.
  Step 7: Make a Login Page in our thing.
  Now keep in mind we are going

## Design Architecutre Compoents
