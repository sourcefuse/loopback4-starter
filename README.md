# loopback4-starter

Loopback 4 starter application. Multi-tenant architecture supported. Authentication, Authorization, Soft deletes, environment vars, Audit logs, included.

- [Setup](#setup)
  - [Clone the repository](#clone-the-repository)
  - [Install dependencies](#install-dependencies)
  - [Setup database](#setup-database)
  - [Setup redis](#setup-redis)
  - [Configure environment](#configure-environment)
  - [Run DB migrations](#run-db-migrations)
  - [Start server](#start-server)
- [Database Model](#database-model)
  - [Key Notes](#key-notes)
  - [Multi-tenant system](#multi-tenant-system)
- [Authentication](#authentication)
- [Authorization](#authorization)
- [Feedback](#feedback)
- [Contributing](#contributing)
- [Code of conduct](#code-of-conduct)
- [License](#license)

## Setup

### Clone the repository

```sh
git clone https://github.com/sourcefuse/loopback4-starter.git
```

### Install dependencies

```sh
npm i
```

### Setup database

Database supported is postgres. Setup a [postgresql](https://www.postgresql.org/) instance. Create a database named **lbstarter**.
DB Schema will be setup automatically via our aplication later.

### Setup redis

Setup a redis instance. Follow the quick start guide [here](https://redis.io/topics/quickstart).

### Configure environment

We need to configure our environment variables now. Copy [.env.example](https://github.com/sourcefuse/loopback4-starter/blob/master/.env.example) and rename as .env. Now provide values for the keys mentioned there. These are going to be database credentials ([created here](#setup-database)) and redis credentials ([created here](#setup-redis)). We don't need to provide all the keys though. For some of these (not needed to be secure keys), we have already specified default values in [.env.defaults](https://github.com/sourcefuse/loopback4-starter/blob/master/.env.defaults). We can remove them. We will require to fill at least these ones.

```json
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
REDIS_HOST=
REDIS_PORT=
REDIS_URL=
REDIS_PASSWORD=
REDIS_DATABASE=
```

### Run DB migrations

Run the below command to setup the database schema and tables with initial seed data.

```sh
npm run db:migrate
```

The above will setup the database as per the diagram here. It will also add a default first super admin user. Details for that is as follows

```json
username=super_admin
password=test123!@#
```

### Start server

Start the node server as below.

```sh
npm start
```

In a browser, visit http://127.0.0.1:3000/ping.

## Database Model

![db-schema](https://github.com/sourcefuse/loopback4-starter/blob/master/db-schema.png)

### Key Notes

- Database used is Postgresql.
- Database schema is based on multi-tenant architecture overall.
- Each table have default columns - id (Primary Key), created_by, modified_by, created_on, modified_on, deleted.
- QR code images are physically stored on Amazon S3 and only a link to them will be available in DB.

### Multi-tenant system

- Tenants are the organisational entities using the application. For example, every mailchimp organisational account directly maps to one tenant in our system.
- Tenant types - Customer, Application (Umbrella Tenant for super admin work).
- Every user will need be associated to a tenant in order to access the application.
- User tenant has a m:n relationship, user_tenants table is the link table for the same.
- Every user will have a role associated for every tenant it belongs to, role_id in user_tenants table.
- Every role has associated permissions.
- Each user may have some extra permissions (allowed or denied) per tenant over and above its role, user_tenant_permissions table takes care of it.

For detailed description of database tables and columns, please refer [here](https://github.com/sourcefuse/loopback4-starter/blob/master/.docs/db-erd.md). Or, you can also open ondefend-schema.html from root folder in your browser.

## Authentication

There are two different strategies of authentication used here.

- **Oauth2 client password + Passport local** - This is a 2-step auth process

  1. Client need to send client credentials (client id and client public key) and user credentials (username and password) to '/auth/login' API. After successful verification, it will return a jwt code containing client details, signed using client's private key (secret) stored in DB. Expiration time of code will be based on value in DB against that auth client.
  2. Next, client will need to send this code along with client id and username to '/auth/token' API. After successful verification, it will return access token (jwt containing user details) and refresh token. Expiration time of token will be based on value in DB against that auth client.

  The scanner app and admin portal both use this strategy.

- **Oauth2 resource owner password** - This is a single step process where in client need to send client credentials (client id and client public key) and user credentials (username and password) to '/auth/login-token' API. In this case, in addition to verifying client credentials and user password, system will also check if the user has permission to access APIs via this auth client. Only those auth clients which have associated userids can use this API for authentication.

  Mailchimp lambda function uses this strategy.

Once access token is obtained, it is needed to be passed into every API as Authorization bearer token header, which will be validated for access to API.

## Authorization

Permissions are part of the access token generated. Authorization implementation is following the [Role based permissions with user level override strategy here](https://github.com/sourcefuse/loopback4-authorization#loopback4-authorization).

## Feedback

If you've noticed a bug or have a question or have a feature request, [search the issue tracker](https://github.com/sourcefuse/loopback4-starter/issues) to see if someone else in the community has already created a ticket.
If not, go ahead and [make one](https://github.com/sourcefuse/loopback4-starter/issues/new/choose)!
All feature requests are welcome. Implementation time may vary. Feel free to contribute the same, if you can.
If you think this extension is useful, please [star](https://help.github.com/en/articles/about-stars) it. Appreciation really helps in keeping this project alive.

## Contributing

Please read [CONTRIBUTING.md](https://github.com/sourcefuse/loopback4-starter/blob/master/.github/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Code of conduct

Code of conduct guidelines [here](https://github.com/sourcefuse/loopback4-starter/blob/master/.github/CODE_OF_CONDUCT.md).

## License

[MIT](https://github.com/sourcefuse/loopback4-starter/blob/master/LICENSE)

<br><br>

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)
