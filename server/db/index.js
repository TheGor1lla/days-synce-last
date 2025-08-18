import pg_promise from 'pg-promise';
const pgp = pg_promise();

const db = pgp(process.env.DATABASE_URL || 'postgres://dsl:dsl@localhost:5435/dsl');

export default db;
