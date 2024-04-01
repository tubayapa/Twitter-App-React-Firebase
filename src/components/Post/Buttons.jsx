import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";

const Buttons = ({ likeCount, handleLike, isLiked }) => {
  return (
    <div className="flex justify-between">
      <div className="grid place-items-center py-2 px-2 rounded-full cursor-pointer transition hover:bg-[#4278a4]">
        <BiMessageRounded />
      </div>

      <div className="grid place-items-center py-2 px-2 rounded-full cursor-pointer transition hover:bg-[#0080007b]">
        <FaRetweet />
      </div>

      <div
        onClick={handleLike}
        className="flex justify-center items-center gap-1 rounded-full transition hover:bg-[#ff000077]"
      >
        {isLiked ? <FcLike /> : <AiOutlineHeart />}
        <span>{likeCount}</span>
      </div>

      <div className="grid place-items-center py-2 px-2 rounded-full cursor-pointer transition hover:bg-[#8080806a]">
        <FiShare2 />
      </div>
    </div>
  );
};

export default Buttons;
