import { useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";
import { onAuthStateChanged } from "firebase/auth";

const FeedPage = () => {
  const [user, setUser] = useState(null);
  // kullanici verisini al ve state aktar
  useEffect(() => {
    // anlik olarak kullanici oturumunu izler
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // kullanici home sayfasindan ayrildiginda onAuthChanged methodunun surekli kullanici oturumunu izleme olayini iptal ediyoruz bu da performansi arttiriyor
    return () => unsub();
  }, []);

  return (
    <section className="feed h-screen bg-black overflow-hidden">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </section>
  );
};

export default FeedPage;
