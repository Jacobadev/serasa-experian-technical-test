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

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

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

## Available Scripts

```bash
# Generate Prisma Client
$ npm run prisma:generate

# Run migrations
$ npm run prisma:migrate

# Seed database
$ npm run db:seed
```