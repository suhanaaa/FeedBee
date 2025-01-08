// import ButtonDeletePost from "./ButtonDeletePost";

// const CardPostAdmin = ({ post }) => {
//   return (
//     <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-center">
//       <div>
//         <div className="font-bold mb-1">{post.title}</div>
//         <div className="  opacity-80 overflow-auto mx-16 h-24 text-justify leading-relaxed max-h-32">
//           {post.description}
//         </div>
//       </div>
//       <ButtonDeletePost postId={post._id.toString()} />
//     </li>
//   );
// };

// export default CardPostAdmin;

import ButtonDeletePost from "./ButtonDeletePost";

const CardPostAdmin = ({ post }) => {
  return (
    <li className="bg-base-100 rounded-3xl p-6 flex justify-between items-center max-w-4xl mx-auto">
      <div className="flex-1 min-w-0">
        <div className="font-bold mb-1 truncate">{post.title}</div>
        <div
          className="opacity-80 overflow-auto leading-relaxed text-justify max-h-24"
          style={{
            whiteSpace: "normal",
            display: "-webkit-box",
            WebkitLineClamp: 3, // Limits text to 3 lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.description}
        </div>
      </div>
      <div className="ml-4">
        <ButtonDeletePost postId={post._id.toString()} />
      </div>
    </li>
  );
};

export default CardPostAdmin;
