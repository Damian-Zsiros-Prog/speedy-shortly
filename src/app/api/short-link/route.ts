import { connection } from "@/app/db/connection"
import { Link } from "@/app/types/Link"
import { NextRequest, NextResponse } from "next/server"
export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { id, largeLink, idUsuario } = (await request.json()) as Link
    if (id == "" || largeLink == "" || idUsuario == "") {
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
      if (resultsArr.length > 0) {
        return new NextResponse(
          JSON.stringify({
            status: "fail",
            message: "Short link with id alredy exists"
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        )
      }
      await (
        await connection
      ).execute(
        `INSERT INTO links (idlink,large_link,idUsuario) VALUES(?,?,?)`,
        [id, largeLink, idUsuario]
      )

      return new NextResponse(
        JSON.stringify({
          status: "success",
          message: "Link shorted succesfully"
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

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")
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
      if (resultsArr.length == 0) {
        return new NextResponse(
          JSON.stringify({
            status: "fail",
            message: "Short link with id not exists"
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" }
          }
        )
      }

      return new NextResponse(
        JSON.stringify({
          status: "success",
          shortLinkInfo: resultsArr[0]
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
