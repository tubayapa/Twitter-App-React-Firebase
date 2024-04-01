import moment from "moment";
import Buttons from "./Buttons";
import { auth, db } from "../../firebase/config";
import Dropdown from "./Dropdown";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import EditMode from "./EditMode";
import { useState } from "react";
import Content from "./Content";

const Post = ({ tweet }) => {
  // kullnici duzenleme modunda mi state
  const [isEditMode, setIsEditMode] = useState(false);

  // tarihin gunumuze gore yazisi
  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // oturumu acik olan kullanici twwetin like dizisinde var mi
  const isLiked = tweet.likes.includes(auth.currentUser.uid);

  // Tweeti kaldir
  const handleDelete = async () => {
    // kaldirilacak elemanin referansi al
    const tweetRef = doc(db, "tweets", tweet.id);

    // eleman silmek icin firebase'a gonder
    await deleteDoc(tweetRef)
      .then(() => {
        toast.warn("Tweet deleted", { autoClose: 750 });
      })
      .catch((err) => toast.danger(err.message, { autoClose: 750 }));
  };

  // tweeti likela

  const handleLike = async () => {
    // referans al
    const tweetRef = doc(db, "tweets", tweet.id);

    // guncelle
    // like'layan kullanicinin id'sini dizisine ekle
    await updateDoc(tweetRef, {
      // oturumu acik kullanicinin like'lari varsa veya yoksa
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };

  return (
    <div className="border-b py-6 px-3 flex gap-3 border-zinc-600">
      <img
        className="w-12 h-12 rounded-full"
        src={tweet.user.photo}
        alt={tweet.user.name}
      />

      <div className="w-full">
        {/* top */}
        <div className="flex justify-between items-center">
          <div className="flex items-center whitespace-nowrap">
            <p className="font-semibold">{tweet.user.name}</p>
            <p className="text-gray-400 text-sm ms-1">
              @{tweet.user.name.toLowerCase().split(" ").join("_")}
            </p>
            <p className="text-gray-400 text-sm ms-2">&#xb7; {date}</p>
            {tweet.isEdited && (
              <p className="text-gray-400 text-xs ms-1">Edited</p>
            )}
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <Dropdown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
        </div>

        {/* middle */}
        <div className="my-4">
          {isEditMode ? (
            <EditMode tweet={tweet} close={() => setIsEditMode(false)} />
          ) : (
            <Content tweet={tweet} />
          )}
        </div>

        {/* bottom */}
        <Buttons
          likeCount={tweet.likes.length}
          handleLike={handleLike}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
};

export default Post;
