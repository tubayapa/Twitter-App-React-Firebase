import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { BsCardImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Loader from "./Loader";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  // tweeetler colleksiyonun referansini al
  const tweetsCol = collection(db, "tweets");

  // dosya resimse, resmi storage yukle
  // resmin urlsini foks cagrildigi yere dondur

  const uploadImage = async (file) => {
    //1-  resim degilse fonk durdur
    if (!file || !file.type.startsWith("image")) return null;

    //2- resmin yuklenecegi konumun referansini  al
    const fileRef = ref(storage, v4() + file.name);

    //3- o konuma dosyayi yukle
    await uploadBytes(fileRef, file);

    //4- resmin url'ilne eris ve dondur
    return await getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1- input verilerine eris

    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    //2- yazi ya da resim icerigi yoksa uyari ver
    if (!textContent && !imageContent) {
      return toast.info("Please enter your tweet", { autoClose: 750 });
    }
    // yuklenme stateni trueya cek
    setIsLoading(true);

    try {
      // 3- resmi storage'a yukle
      const url = await uploadImage(imageContent);

      // 4- yeni tweeti koleksiyona ekle
      await addDoc(tweetsCol, {
        textContent,
        imageContent: url,
        createdAt: serverTimestamp(),
        likes: [],
        isEdited: false,
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
      });
    } catch (err) {
      console.log(err);
    }

    // yuklenme stateini false'a cek
    setIsLoading(false);

    // 5- input verileri temizle
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-b border-zinc-600 p-4"
    >
      <img
        className="rounded-full h-[35px] md:h-[45px] mt-1"
        src={user?.photoURL}
        alt="tuba"
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none"
          placeholder="What is happening?!"
          type="text"
        />

        <div className="flex justify-between item-center">
          <label
            className="text-lg transitin p-4 cursor-pointer rounded-full hover:bg-gray-800 "
            htmlFor="image"
          >
            <BsCardImage />
          </label>

          <input className="hidden" type="file" id="image" />

          <button
            type="submit"
            className="bg-blue-500 flex items-center justify-center px-4 py-2 min-w-[85px] min-h-[20px] transition hover:bg-blue-600 rounded-3xl"
          >
            {isLoading ? <Loader styles={`!text-white`} /> : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
