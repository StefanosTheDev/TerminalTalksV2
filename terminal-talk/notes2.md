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
