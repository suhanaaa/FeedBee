import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
// import Board from "@/models/Board";
import { auth } from "@/auth";
import Link from "next/link";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonPortal from "@/components/ButtonPortal";

//extra
export const revalidate = 0;

async function getUser() {
  const session = await auth();

  await connectMongo();

  // return await User.findById(session.user.id).populate("boards");

  const user = await User.findById(session.user.id).populate("boards");
  console.log("Dashboard user data:", {
    id: user._id,
    hasAccess: user.hasAccess,
    customerId: user.customerId,
  });

  return user;
}

export default async function Dashboard() {
  const user = await getUser();

  console.log(user);

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER  */}
      <section className="bg-base-100">
        <div className="max-w-5xl mx-auto px-5 py-3 flex justify-between">
          {user.hasAccess ? <ButtonPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-5 py-12 space-y-12">
        <FormNewBoard />

        <div>
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length} Boards
          </h1>

          <ul className="space-y-4">
            {user.boards.map((board) => {
              return (
                <li key={board._id}>
                  <Link
                    href={`/dashboard/b/${board._id}`}
                    className="block bg-base-100 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200"
                  >
                    {board.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
