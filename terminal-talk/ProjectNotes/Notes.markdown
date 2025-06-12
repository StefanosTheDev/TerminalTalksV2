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
