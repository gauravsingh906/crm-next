import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

// Connect to the database
connect();
export async function GET() {

    const data = await User.find();
    return NextResponse.json({ result: data }, { status: 400 });
}

export async function POST(request: NextRequest) {

    try {
        // Parse request body
        const reqBody = await request.json();
        console.log(reqBody);
        const { username, email, password } = reqBody;

        // Validate user existence

        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10); // Use async genSalt
        console.log(salt, "salt");
        const hashedPassword = await bcryptjs.hash(password, salt);
        console.log(hashedPassword, "hashedPassword")

        // Create and save new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // Send verification email
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({ message: "User Registered Successfully", success: true, savedUser });
    } catch (err: any) {
        return NextResponse.json({ error: err.message + "kaise ho" }, { status: 500 });
    }
}
