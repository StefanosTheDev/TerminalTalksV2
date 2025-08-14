Check out This:
Somethign to consider is when I am using a String in the params i noticed I have to the use The Params<>
Why Is This there was a change in

OLD WAY
// Params were synchronous objects
export default async function Page({
params
}: {
params: { id: string }
}) {
// Direct access
console.log(params.id); // Works immediately
}

NEW WAY
// Params are now Promises
export default async function Page({
params
}: {
params: Promise<{ id: string }>
}) {
// Must await first
const { id } = await params;
console.log(id);
}

Why Did This Change?
Next.js 15 made params (and searchParams) asynchronous to improve performance:
Faster streaming - Pages can start rendering before all params are processed
Better parallelization - Multiple async operations can happen simultaneously
Preparation for future features - Enables more advanced routing capabilities

// 1. Destructure after awaiting
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
// Use id...
}

// 2. Handle searchParams too
export default async function Page({
params,
searchParams
}: {
params: Promise<{ id: string }>;
searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
const { id } = await params;
const { query } = await searchParams;
// Use both...
}

// 3. Parallel await (when you need both)
export default async function Page({ params, searchParams }: Props) {
const [{ id }, search] = await Promise.all([params, searchParams]);
// Use both...
}

Differences between Types vs Interfaces.

Interesting Hydraton Error regarding the Clerk Auth Signed In Components. Something to consider is that sometimes you dont even need to be importing it but the app loads and it can cause an issuse.

---

CLERK HYDRATION ERROR
Okay so what was the fina lverdict on how this go tfixed?Here's the final verdict on how we fixed the hydration error:
The Problem Was:

Clerk's auth components (UserButton, SignedIn) render differently on server vs client
Race condition: Sometimes Clerk loads before React hydrates (no error), sometimes after (error)
The error was intermittent - classic sign of timing issues

The Final Fix Was:
We created a separate client-only component that uses the isMounted pattern:
Why This Works:

Server renders: Placeholder (loading state)
Client initial render: Same placeholder (matches server ✅)
After mount: Real UserButton (no hydration check happens here)

Key Insights:

The error was specifically with the <div className="flex items-center gap-3"> inside SignedIn
Even though ChatSideBar was already a client component, Clerk's components still caused issues
The isMounted pattern ensures server and client always start with identical HTML

## This is a bulletproof pattern for any component that causes hydration errors - delay the problematic rendering until after the component mounts on the clien
