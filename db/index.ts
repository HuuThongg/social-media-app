import * as schema from "./schema";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
const connectString =
  "postgresql://HuuThongg:nXx5ZCNyrE2c@ep-rapid-rain-55229075-pooler.us-west-2.aws.neon.tech/socialmediaapp?sslmode=require";
// const sql = neon(process.env.DATABASE_URL!);
const sql = neon(connectString);

export const db = drizzle(sql, { logger: true, schema: schema });
