# Lataj w Polsce API

Prosty serwer API z Fastify.

## Instalacja

```bash
npm install
```

## Development

```bash
npm run dev
```

Serwer startuje na http://localhost:3001

## Budowanie

```bash
npm run build
```

## Produkcja

```bash
npm start
```

## Endpoints

- `GET /` - Status API
- `GET /api/health` - Health check
- `GET /api/airports` - Lista lotnisk
- `GET /api/airports/:id` - Szczegóły lotniska

## Stack

- **Fastify** - Szybki framework webowy
- **TypeScript** - Typowanie
- **Nodemon** - Auto-restart w development
