import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState();

  useEffect(() => {
    // kullanici oturumundaki degisimleri izler
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // kullanici varsa yetki stateini true ya cek
        setIsAuth(true);

        // kullanici yoksa yetki stateini false a cek
      } else {
        setIsAuth(false);
      }
    });

    return () => unsub();
  }, []);

  /// eger yetkisi yoksa login e yonlendir
  if (isAuth === false) {
    // useNavigate kullanınca bileşen tam yüklenemden yönlendirme yapmamızdan kaynkalı react uyarı veriyordu bizde useNavigate yerine Navigate bileşeni kullandık. Bunu kullanınca browser router bileşenin yüklenem işlemini tamamlmış gibi algıliyor ve "to" propu oalrak tanımdladığımız sayfaya yönlendiriyor

    return <Navigate to={"/"} />;
  }

  // kapsayici bir route'da alt route'u cagirma
  return <Outlet />;
};

export default ProtectedRoute;
