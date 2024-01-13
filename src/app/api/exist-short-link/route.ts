import { connection } from "@/app/db/connection"
import { NextRequest, NextResponse } from "next/server"
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const queryParams = request.nextUrl.searchParams
    const id = queryParams.get("id")
    if (id == "") {
      let error_response = {
        status: "fail",
        message: "Values empty for save shortLink"
      }
      return new NextResponse(JSON.stringify(error_response), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      })
    }
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
