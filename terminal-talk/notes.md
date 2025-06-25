Go Into Button Props and How This reallyw works with Re-Usable Components.
I think this and forms owuld be helpful. Button Props thought and diffeerent approaches is important. Need To Review

There is a difference between next navigation / next router

Why when i had the slug I couldnt just pass anything into the params like docs/sdflkjsdf. WHy did i need to have it found. Etc.

Dive Into Alternatives ways to handle that FFrameworsk Section. I see real avalue in keeping it like th eway it is. Also I see value having a datstructure.
Okay the way io did it with this GetFrameworks Stuff I really like. This is a good strategy.

Okay 2 Approaches Of Handling Dropdown.
Basic UseState Toggle (Most Common & Simple)

// Appoorach 1:

- Set a Set Option of IsOpen vs SetIsOpen. When something is clicked. We will toggle the IsOpen Option. For this.
-

// Approach 2 That I like is the mutliple dropdwon navigation

A Great Conversation To Hhave is When your Havin gYour page compoennt server and your renderin gstuff fhow much should stuff be loaded.

Added Await To The Params

## The Approach For Solving The Latency Issue For When User Clicks A Route That Doesnt Exist. The Issue Was That It was not loading to fast.

### What were solving:

- We dont want every incomming request for /docs/my-slug to hit the database/ Files.
- Correct 404s, If the slug doesnt exist. We want to show our nice Docs-Themed 404,.
- Re-usability: The Same Pattern Should Work for [/blog/slug]

## Lazy Factory: Instead of exporting a big constant array you export a function (a facotry that when a=called returns a brand new array of topics.

Dev/Hydration in NextJS yo urun your code twice in dev. Once on the server (for ))
Lazy factory”: instead of exporting a big constant array, you export a function (a factory) that, when called, returns a brand-new array of topics.

“Dev/hydration”: in Next.js you run your code twice in dev—once on the server (for SSR or data-fetching) and once on the client (for React’s hydration).

“Without bundling twice”: if you had done

ts
Copy
Edit
export const topicsData = [ … ]
then importing that in both server and client components would duplicate the entire array literal in both your server bundle and your client bundle—blowing up build size. By wrapping it in a function and only invoking it in your server code (e.g. in a server component or getStaticProps), you can pass the resulting array down as props into client components without ever importing that module on the client side. The client never pulls in the original module, so you avoid shipping that data twice.

Why this pattern helps
Fresh copy on every call
Each topics() invocation returns a new array, so you never accidentally share or mutate a single instance between server and client (or between renders).

Tree-shaking & bundle-size
If you only call topics() in server-only code, most bundlers (including Next.js’s) will see that your client-side components don’t import the module at all—and so they drop it entirely from the client build.

Hot-Reload consistency
In development, when you tweak \_lib/data/topics.ts, HMR will re-execute your factory and you’ll see real-time updates in both SSR renders and client hydration without a full rebuild.

NOTES: Take notes on the approach for the improvement in cacheing and why that worked. That was a critical example of great opportunity to leverage this. Especially with the error situation.
//With dynamicParams = false, any slug not returned from generateStaticParams() immediately 404s—no server-side code runs, no DB hit. It turns a multi-second dead-end lookup into an instant “not found.”
