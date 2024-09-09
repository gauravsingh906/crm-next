import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";


// Connect to the database
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { email, password } = reqBody;
        console.log(email, password, "check")
        //validate
        console.log(reqBody);
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User doesnot exist" }, { status: 400 })
        }
        console.log(user, "user exist");

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "check your credentials" }, { status: 401 })
        }

        const tokenData = { id: user._id, username: user.username, email: user.email }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        console.log(token)
        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;
    }
    catch (err) {

    }
}