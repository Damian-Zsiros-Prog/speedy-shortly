import mysql from "mysql2/promise"

export const connection = mysql.createConnection(process.env.DATABASE_URL || "")
