// pages/api/users/me.ts
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// Connect to the database
connect();

export async function GET(request: NextRequest) {
    try {
        // Extract user ID from the token
        const userId = await getDataFromToken(request);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Fetch user data from the database
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Return the user data
        return NextResponse.json({
            message: "User found",
            data: user
        });
    } catch (error) {
        console.error("Error in GET /api/users/me:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
