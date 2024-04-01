import { collection, count, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

const Aside = () => {
  const [tweetsCount, setTweetCount] = useState(0);
  useEffect(() => {
    // abone olunacak koleksiyounun referansi(verileri canli olarak almak)
    const tweetsCol = collection(db, "tweets");
    const q = query(tweetsCol, count());

    onSnapshot(q, (snapshot) => {
      setTweetCount(snapshot.size);
    });
  }, []);
  return (
    <div className="max-xl:hidden p-4">
      <h1 className="text-lg font-semibold">Tweets Count: {tweetsCount}</h1>
    </div>
  );
};

export default Aside;
