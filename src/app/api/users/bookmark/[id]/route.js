import connect from "@/db/db";
import User from "@/models/userModel";
import { getToken } from "@/utils/getToken";
import { NextResponse } from "next/server";
connect();
export async function POST(request, { params }) {
  try {
    const userId = await getToken(request);
    const postId = params.id;
    if (!userId) {
      return NextResponse.json({ message: "Please login" }, { status: 401 });
    }
    const user = await User.findById(userId);
    const isBookMarked = user.bookmarks.includes(postId);
    if (isBookMarked) {
      user.bookmarks = user.bookmarks.filter(
        (data) => data.toString() !== postId
      );
    } else {
      user.bookmarks.push(postId);
    }
    await user.save();
    return NextResponse.json(
      {
        message: isBookMarked ? "Bookmarked removed" : "Bookmark added ",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
