# Todo server (Express, TypeScript & MongoDB)

## Key technologies

- **Express**
- **Mongoose**
- **TypeScript**
- **dotenv**

## Project structure

```
server/
├── src/
│   ├── controllers/    # Express controllers that handle incoming requests
│   │   └── todo.controller.ts
│   ├── services/       # Business logic separated from controllers
│   │   └── todo.service.ts
│   ├── models/         # Mongoose models (schemas & interfaces)
│   │   └── todo.model.ts
│   ├── routes/         # Route definitions grouped by feature
│   │   └── todo.routes.ts
│   ├── config/         # Centralised configuration (e.g. database connection)
│   │   └── database.config.ts
│   ├── app.ts          # Express app setup (middleware, health checks, error handler)
│   └── index.ts        # Entry point – starts the server after connecting to MongoDB
|── types               # types
|   └── env
|       └── index.d.ts
├── package.json
├── tsconfig.json
├── LICENSE
├── .prettierrc
├── .prettierignore
├── .editorconfig
└── .env.example        # Sample environment configuration

```

## Getting started

1. **Install dependencies.**

   ```bash
   cd server
   npm install
   ```

2. **Configure the environment.**

   Copy the provided `.env.example` to `.env` and adjust the `PORT` and `MONGO_DB_URI` variables to match your local setup. Ensure you have a running MongoDB instance.

   ```bash
   cp .env.example .env
   # Edit .env as needed
   ```

3. **Run the server in development mode.** `nodemon` will automatically restart the server when files change.

   ```bash
   npm run dev
   ```

4. **Build and run in production mode.** This compiles TypeScript to JavaScript in the `dist` folder and starts the server.

   ```bash
   npm run build
   npm start
   ```

5. **API endpoints.**
   - `GET  /api/v1/todos` – List all todos
   - `POST /api/v1/todos` – Create a new todo (expects `title`, optional `description` and `completed` fields in the request body)
   - `GET  /api/v1/todos/:id` – Retrieve a single todo by its ID
   - `PUT  /api/v1/todos/:id` – Update an existing todo (send only the fields to update)
   - `DELETE /api/v1/todos/:id` – Remove a todo

## Extending the API

You can extend this project by adding new models, services, controllers and routes. For example, to add a "User" resource:

1. Create `src/models/user.model.ts` defining the schema and interface.
2. Implement business logic in `src/services/user.service.ts`.
3. Add controller functions in `src/controllers/user.controller.ts`.
4. Expose routes in `src/routes/user.routes.ts` and mount them in `src/app.ts` under a prefix like `/api/users`.

By following this layered approach, your code remains organized, testable and easy to evolve.
