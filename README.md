# TeamUp
## Tech Stack
- NextJS
- Clerk - Auth
- ShadCN - Color theme


![image](https://github.com/anuragdaksh7/Team-Up/assets/84393491/cd09e928-a8c9-493e-a6ad-1e62ff58d9ed)


## Installation

```bash
git clone https://github.com/anuragdaksh7/Team-Up.git
cd Team-Up
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

.env.local
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL = /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL = /sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL = /home
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL = /home

MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.t5t9fvx.mongodb.net/test

```