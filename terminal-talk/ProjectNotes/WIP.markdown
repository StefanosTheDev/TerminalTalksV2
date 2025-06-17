Documentation NextJS
layout.tsx must contain html and body tags.

App -> App Routes.
Pages - Page Router.
Public - Static Assets to be served

Core Routing Files
layout, page, loading, not-found, error, global-error, route, template default.

Nested Routes
folder / route segement
folder/folder Nested Route segment.

Define Catch All Route Segement s Optional Cal All.
[...slug] like saying: “You must give me at least one piece of information after /blog.”

[[...slug]] like saying: “Give me as much or as little info as you want after /blog — even nothing is okay.”

Privvate Folders vs Group Rpoutes. This si soemthing that i ll have to look into and implement inot my application.
Which components will be routes which will be \_components etc.
Use (folder-name) (route groups) when you want to organize routes or apply layouts without changing the URL — great for grouping things like (auth) or (dashboard).

Use \_folder-name (private folders) when you have code like components, services, or utils that should not become routes — it's just for keeping things clean and organized.

Implement Route Groups.

My Project Design Pattern
// Organize Routes without affecting the URL Path
/ Think Youtube Pre-Rendering WHen that tempalte is loaded.

---

Why did teh layout part work wher i could seperate the side Nav from the main page.
https://claude.ai/public/artifacts/37517b53-dd78-4cdc-9115-58ed163a2006 Reg / Login
https://claude.ai/public/artifacts/e49a34e8-d964-4bb9-a239-7ddf5dbf64d6 Landing Page.
