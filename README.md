# Desafio Técnico — API de Gestão de Pets 

## Running with Docker

To run the application using Docker, follow these steps:

1.  **Start the services:**

    ```bash
    $ docker-compose up -d
    ```

2.  **Run database migrations:**

    ```bash
    $ docker-compose exec api npm run prisma:migrate
    ```

3.  **Seed the database:**

    ```bash
    $ docker-compose exec api npm run db:seed
    ```

4.  **Stop the services:**

    ```bash
    $ docker-compose down
    ```

## Project setup without Docker Compose

Follow these steps to run the app locally (without Docker Compose), using the same database settings as docker-compose.

1) Install dependencies

```bash
$ npm install
```

2) Start a MySQL 8 database (same config as docker-compose)

- Option A — using Docker (only for DB):

```bash
$ docker run -d --name pet_management_db -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=pet_management \
  -e MYSQL_USER=user \
  -e MYSQL_PASSWORD=password \
  mysql:8.0
```

- Option B — using a local MySQL install:
  - Create a database named `pet_management`.
  - Ensure a user with access (for simplicity you can use root/root, or adjust the URL below accordingly).

3) Create a .env file at the project root

Use the same values used in docker-compose:

```
DATABASE_URL="mysql://root:root@localhost:3306/pet_management"
JWT_SECRET="be883c570a07881cf3e9fa93acfd8ae4"
APP_PORT=5000
```

4) Generate Prisma Client (optional if already generated)

```bash
$ npm run prisma:generate
```

5) Run Prisma migrations (REQUIRED)

This step is mandatory for the application to work correctly.

```bash
$ npm run prisma:migrate
```

6) Seed the database (optional, but recommended for testing)

```bash
$ npm run db:seed
```

## Compile and run the project

Before starting the application, make sure you have:
- A MySQL instance running (same settings as docker-compose).
- Run Prisma migrations (REQUIRED):
  ```bash
  $ npm run prisma:migrate
  ```
- (Optional) Seed the database:
  ```bash
  $ npm run db:seed
  ```

Then start the app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Base path: all routes are served under `/api/v1`.

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:5000/api/docs
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and receive JWT token

### Users
- `GET /users/me` - Get authenticated user profile (requires JWT)

### Pets
- `POST /pets` - Create a new pet (requires JWT)
- `GET /pets` - Get all pets owned by authenticated user (requires JWT)
- `GET /pets/:id` - Get a specific pet (requires JWT)
- `PUT /pets/:id` - Update a pet (requires JWT)
- `DELETE /pets/:id` - Delete a pet (requires JWT)

### Appointments
- `POST /appointments` - Create a new appointment (requires JWT)
- `GET /appointments` - Get all appointments with optional filters (requires JWT)
- `GET /appointments/:id` - Get a specific appointment (requires JWT)
- `PUT /appointments/:id` - Update an appointment (requires JWT)
- `DELETE /appointments/:id` - Delete an appointment (requires JWT)