import { NextRequest, NextResponse } from "next/server";

export const dataResponse = (req: NextRequest , data: any, status: number) => {
    return NextResponse.json({
        message: "Success",
        data: data
    }, {
        status: status
    })
}

export const messageResponse = (req: NextRequest, message: string, status: number) =>  {
    return NextResponse.json({
        message: message
    }, {
        status: status
    })
} 