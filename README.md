This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install dependencies:

 npm install 
 npm install react-router-dom
 npm install idb js-cookie
 npm install @radix-ui/react-tooltip
 npm install react-tooltip
 npm install framer-motion
 npm install react-datetime
 npm install react-datepicker
 npm install formidable   
 npm install xlsx file-saver 
 npm install axios react-router-dom
 npm install fs
 npm install bcrypt
 npm install react-datepicker react-datetime lucide-react
 npm install react-colorful
 npm install js-cookie
 npm install uuid @types/uuid
 npm install --save-dev @types/file-saver
 npm install --save-dev @typescript-eslint/eslint-plugin
 npm install --save-dev cross-env
 npm install zod
 npm install -g netlify-cli - for local testing CI Build Setup
 npm install @testing-library/react
npm install --save-dev @types/jest


First, run the development server:

```bash
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

 ## Run tests: 

   npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

We suggest that you begin by typing:

    npx playwright test

to run the test cases
npx playwright test --headed
