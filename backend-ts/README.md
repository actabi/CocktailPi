# CocktailPi TypeScript Backend

This folder contains an experimental TypeScript rewrite of the CocktailPi backend. It aims to provide the same REST API as the existing Java implementation.

## Setup

1. Install dependencies with `npm install` *(requires internet access)*.
2. Build the project using:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

During development you can run:

```bash
npm run dev
```

## Testing

Run the Jest test suite using:

```bash
npm test
```

### API endpoints

Currently implemented routes:

- `POST /api/auth/login` – authenticate a user (dummy token)
- CRUD operations for recipes under `/api/recipe`
- CRUD operations for users under `/api/user`
- CRUD operations for ingredients under `/api/ingredient`
- CRUD operations for categories under `/api/category`

## Migration Notice

The TypeScript backend currently coexists with the original Java backend. The goal is to reach feature parity and eventually remove the Java implementation once migration is complete.
