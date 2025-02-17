This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## DB

#### We use TursoDb

Login to Turso

```
turso auth login

```

Show list Turso DB

```
turso db list
```

Open cli shell

```
turso db shell communaldb
```

## Testing

Run tests

```
npm run test
```

Watching test

```
npm run test:watch
```

Show test coverage

```
npm test -- --coverage
```

Watching test with coverage in realtime

```
npm test -- --watchAll --coverage
```
