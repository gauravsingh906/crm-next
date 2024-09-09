
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";


// Connect to the database
connect();

export async function GET(request: NextRequest) {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password")

    //check if there is no user
    return NextResponse.json({
        message: "USer found",
        data: user
    })

}