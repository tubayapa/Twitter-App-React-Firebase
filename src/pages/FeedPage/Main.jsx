import Post from "../../components/Post";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/Loader";

const Main = ({ user }) => {
  const [tweets, setTweets] = useState();
  useEffect(() => {
    // abone olunacak koleksiyounun referansi(verileri canli olarak almak)
    const collectionRef = collection(db, "tweets");

    // siralama ayarlari
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    //kolleksiyondaki verileri canli al
    const unsub = onSnapshot(q, (snapshot) => {
      const tempTweets = [];
      snapshot.forEach((doc) => tempTweets.push({ ...doc.data(), id: doc.id }));
      setTweets(tempTweets);
    });

    // kullanici anasayfada ayrildiginida koleksiyounu izlemey birak, performans arttsin
    return () => unsub();
  }, []);

  return (
    <div className="border border-zinc-600 overflow-y-auto">
      <header className="font-bold p-4 border-b  border-zinc-600  ">
        Home
      </header>

      <Form user={user} />
      {!tweets ? (
        <Loader styles={`w-8 h-8 my-10`} />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </div>
  );
};

export default Main;
