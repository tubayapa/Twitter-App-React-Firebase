import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { db } from "../../firebase/config";
import { BsTrashFill } from "react-icons/bs";
import { IoMdReturnLeft } from "react-icons/io";

const EditMode = ({ tweet, close }) => {
  const [isPicDeleting, setIsPicDeleting] = useState(false);

  const inputRef = useRef();
  // kaydet'e tiklaninca inputtaki yaziya eris
  const handleSave = async () => {
    // 1- input verilerine eris
    const newText = inputRef.current.value;
    //2- guncellenecek documanin referansini al
    const tweetRef = doc(db, "tweets", tweet.id);
    //3- guncelle

    const updated = isPicDeleting
      ? {
          textContent: newText,
          isEdited: true,
          imageContent: null,
        }
      : {
          textContent: newText,
          isEdited: true,
        };

    await updateDoc(tweetRef, updated);

    //4- duzenleme modundan cik
    close();
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="rounded p-1 px-2 text-black"
        defaultValue={tweet.textContent}
      />
      <button
        onClick={handleSave}
        className="rounded-lg  shadow mx-2 p-2 text-green-400 hover:bg-green-900 transition"
      >
        <BiSolidSave />
      </button>
      <button
        className="rounded-lg shadow p-2 text-red-400 hover:bg-red-900 transition"
        onClick={close}
      >
        <ImCancelCircle />
      </button>

      {tweet.imageContent && (
        <div className="relative">
          <img
            className={`
            ${
              isPicDeleting ? "blur" : ""
            } max-h-[300px] object-cover w-full rounded-lg my-3`}
            src={tweet.imageContent}
          />
          <button
            onClick={() => setIsPicDeleting(!isPicDeleting)}
            className="absolute top-0 right-0 text-xl p-2 bg-white transition text-red-600 hover:scale-90 rounded-full"
          >
            {isPicDeleting ? <IoMdReturnLeft /> : <BsTrashFill />}
          </button>
        </div>
      )}
    </>
  );
};

export default EditMode;
