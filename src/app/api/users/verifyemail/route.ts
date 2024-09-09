import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

//here we can also used sendmail when user is verified then send successully verified message

// Connect to the database
connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        console.log(token);
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        }
        console.log(user);
        //if verified happen then update to database 
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({ message: "Email verified Successfully", success: true }, { status: 200 })
    }
    catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}