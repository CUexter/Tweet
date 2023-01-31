# <p align="center"> Next.js + Pocketbase + React Query template</p>

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## To use

Install [degit](https://github.com/Rich-Harris/degit)

```bash
npm i -g degit
```

```bash
degit git@github.com:CUexter/next-template.git#mantine
rm CHANGELOG.md
```

and edit the `package.json` to change the package name and the version number to `0.0.0`

## Technologies used

- ⚛️ [React 18](https://reactjs.org/)
- 💎 [Typescript](https://www.typescriptlang.org/)
- [React Query](https://react-query-v3.tanstack.com/)
- [Playwright](https://playwright.dev)
- [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com/)
- [NEXT.js](https://nextjs.org)
- [Pocketbase](https://pocketbase.io)
- [Mantine](https://mantine.dev)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Prettier](https://prettier.io/), [Stylelint](https://stylelint.io/), [ESLint](https://eslint.org/)
- [Github Actions](https://github.com/features/actions)
- [Semantic Release](https://github.com/features/actions)
- [Husky](https://typicode.github.io/husky/#/) & [Lint Staged](https://github.com/okonet/lint-staged)

For this project we are going to use [pnpm](https://pnpm.io)

To install it:

```bash
npm i -g pnpm
```

## Install dependencies

```bash
pnpm i
```

### Installing Pocketbase

Suppose you are running Linux or Windows subsystem for Linux(WSL)

Install `unzip` and `wget` to automate the installation of pocketbase by running `pb-setup.sh`

For users of other operating systems, please extract the pocketbase zip files in a directory called `pb`

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the next.js page.

Open [http://localhost:8090/\_](http://localhost:8090/_) with your browser to see the pocketbase admin UI.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Playwright

### Windows or Ubuntu

```cmd
pnpm exec playwright install --with-deps
```

### Docker

```bash
docker pull mcr.microsoft.com/playwright:latest
```

### Arch Linux

To set up playwright on arch linux:

```bash
yay -S libffi7 enchant1.6 icu66 libwebp052
sudo ln -s /usr/lib/libpcre.so /usr/lib/libpcre.so.3
```

## Contributing

### Commit Message

To commit please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) rules

This will provide a prompt to help you write good commit messages for us to handle. This will automatically run the git commit command for staged files.

#### IMPORTANT: ALL MESSAGE SHOULD BE LOWERCASE

### VSCode

If you want to commit in VSCode I highly recommend using this extension: [Conventional Commits](https://marketplace.visualstudio.com/items?itemname=vivaxy.vscode-conventional-commits)

You can access VSCode Conventional Commits in two ways:

1. `Command + Shift + P` or `Ctrl + Shift + P`, enter `Conventional Commits`,
   and press `Enter`.
2. Click the icon on the Source Control menu. See the image below.

![Icon on the Source Control menu](https://github.com/vivaxy/vscode-conventional-commits/raw/master/assets/docs/icon-on-the-source-control-menu.png)
