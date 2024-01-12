import { connection } from "@/app/db/connection"
import { Link } from "@/app/types/Link"
import { NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const queryParams = request.nextUrl.searchParams
    const id = queryParams.get("id")

    try {
      const [results] = await (
        await connection
      ).query(`SELECT * FROM links WHERE idlink = ?`, [id])
      const resultsArr = results as Array<Object>
      return new NextResponse(
        JSON.stringify({
          status: "success",
          exists: resultsArr.length > 0
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" }
        }
      )
    } catch (err) {
      console.log(err)
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: err
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      )
    }
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    })
  }
}
