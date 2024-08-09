export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
  database: {
    url: process.env.DATABASE_URL ?? 'postgresql://postgre:postgre@localhost:5432/nestjs?schema=public',
  },
  jwtSecret: process.env.JWT_SECRET ?? 'JWT_SECRET'
});