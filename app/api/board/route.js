// //board api

// import connectMongo from "@/libs/mongoose";
// import { NextResponse } from "next/server";
// import User from "@/models/User";
// import Board from "@/models/Board";
// import { auth } from "@/auth";

// export async function POST(req) {
//   try {
//     const body = await req.json();

//     if (!body.name) {
//       return NextResponse.json(
//         { error: "Board name is required" },
//         { status: 400 }
//       );
//     }

//     const session = await auth();

//     if (!session) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 401 });
//     }

//     //Connection between api endpoint and database
//     await connectMongo();

//     User.find();
//     User.findById();

//     const user = await User.findById(session.user.id);

//     //this is to restrict to write any thing on the board
//     if (!user.hasAccess) {
//       return NextResponse.json(
//         { error: "Please subscribe first" },
//         { status: 403 }
//       );
//     }

//     const board = await Board.create({
//       userId: user._id,
//       name: body.name,
//     });

//     user.boards.push(board._id);
//     await user.save();

//     return NextResponse.json({});
//   } catch (e) {
//     return NextResponse.json({ error: e.message }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   try {
//     //Vlidate the prresence of boardId in  the request
//     const { searchParams } = req.nextUrl;
//     const boardId = searchParams.get("boardId");

//     if (!boardId) {
//       return NextResponse.json(
//         { error: "boardId is required" },
//         { status: 400 }
//       );
//     }

//     //Ensure the user is authenticated
//     const session = await auth();

//     if (!session) {
//       return NextResponse.json({ error: "Not authorized" }, { status: 401 });
//     }

//     //Delete the board from the database
//     await Board.deleteOne({
//       _id: boardId,
//       userId: session?.user?.id,
//     });

//     // Updates the user’s document by removing the reference to the deleted board.
//     const user = await User.findById(session?.user?.id);

//     if (!user.hasAccess) {
//       return NextResponse.json(
//         { error: "Please subscribe first" },
//         { status: 403 }
//       );
//     }

//     user.boards = user.boards.filter((id) => id.toString() !== boardId);
//     await user.save();

//     return NextResponse.json({});
//   } catch (e) {
//     return NextResponse.json({ error: e.message }, { status: 500 });
//   }
// }

// // req: contains the data send by the client

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await connectMongo();

    const user = await User.findById(session.user.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 }
      );
    }

    const board = await Board.create({
      userId: user._id,
      name: body.name,
    });

    user.boards.push(board._id);
    await user.save();

    return NextResponse.json(board);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        { error: "boardId is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const user = await User.findById(session?.user?.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 }
      );
    }

    await Board.deleteOne({
      _id: boardId,
      userId: session?.user?.id,
    });

    user.boards = user.boards.filter((id) => id.toString() !== boardId);
    await user.save();

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
