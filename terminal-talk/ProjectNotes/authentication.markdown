- ## More On The Authentication Part
- There is a bridge flow here that is : Auth session state (user logs in -> you get a session)
- Typescript knowing whats in session.user
- Using user dat ain client -side pages like your dashboard

// The flow now into clean chunks is this:

- Part 1: in our ` types / next-auth.d.ts file`
  Were essentially saying hey. when someone suses session.user or user i want to make it sure it includes id and other fields with correct typing. Now useSession() and getServer session will return a session with your updated types. WE DO NOT NEED TO IMPORT types/next-auth.d.ts its picked up globally. So now we can safely do `session.user.id` `session.user.email ` ` session.user.name`.

Part 2: Using user type lets say in a Dashboard Page
`import { User } from 'next-auth'; // ✅ Correct This is how you ahev to do it. It's now part of this global next-auth process`
Because of module augmentation this user now includes your custom fields. Clariffication on the process of this aa bit and the field add

// Part 3: useSession () & Session-based login
When the user logs in (Google or credentails) the session object is what you use to keep track of the logge din user / show info / auth gate routes.

const { data: session, status } = useSession();
if(!session) {
return <p>You are not signed
}

// you can trust the session.user.id because of your type augmentation.

In many ways the flow is

```A[User Logs In] --> B[NextAuth creates Session + JWT]
  B --> C[Session includes user.id, name, email...]
  C --> D[You access session via useSession()]
  D --> E[Render dashboard based on session.user]
```

So what you're doing on DashboardPage is perfect. You’re just accessing the session (which NextAuth manages) and typing it safely with help from your next-auth.d.ts.

Next-Auath really provides the completed unified authyentication system taht works across different providers .
So we dont have to write the AP iroutes are self. we get somehelp here.
SO signIn('gogoogle',)
signIn('credentials', {email: password}
singout()) We are solid HEre

Session managementl. :
ON the CLient : useSession() now lets React know whos logged In
on the SErver getServerSession() gives you secure session access in server routes or compoenets.
We dont need to handle cookies or tokens yourself.

Key words : That we get from the Next-Auth.
Key Purpose
providers Login methods
authorize() Verifies credentials login
callbacks.jwt() Build/modify the token
callbacks.session() Build/modify the session
pages.signIn Where to redirect for login
session.strategy Use JWT or DB for session
events.signIn Trigger on login events

#### Continued Authentication More on The next-Auth.d.ts docs

Import NextAuth Options. Its a typescript interface provided by next-auth library. It helps shape the config object you pass into NextAouth() to setup auth. So we can get providers, callbacks sessionb ehavior itec.

So there is a approach wif you . There is a whole consncept of using / keeping your app stateless and fast and easy to host by not trackign sessions in the DB. we are doing it in the JWT.
So session: {streagy: jwt means store user session dat ain a secure cookie not he db. This is deal for modern apps. }

The nextAuth from 'next-auth'. This is the file that connects from the NextAuth to the App Router. without this we wouldnt be able to call anything like signIn singOut or useSession.

import NextAuth from 'next-auth';
ISSUES with having my layout.ltsx as a client ocmponent research thsi again.
We need to have a Sessin PRovider Client Component and we then Import that and Wrap it around the main layout.

/ we leverage useSession() is a react HOok that relies on the context ession Provider.
// I tCHekcs the cookie from nextAutha nd give you real time session data.
// General process is 30 days

// This is when we are rendering the obj. in the page. tsx.
const { data: session } = useSession();
means “give me the current user’s session info and store it in a variable called session.”

It’s a clean way to check who is logged in and what info is available from their session.

Let me know if you want to see how useSession() compares to getServerSession()!

Leveraing useSession() client side to check if someone is logged In is no bueno. Reason why is because it is insecure and the content that would be protected isnt anymore.

To Protect a Route ugetServerSession() in any route you want to protect like dasshboard.
