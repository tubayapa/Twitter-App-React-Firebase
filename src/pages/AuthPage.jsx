import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSigUp] = useState(false);

  // kullaniciya mail de atacagimiz icin her an email ve pass bilgisine ihtiyacimiz o yuzden statete tuttuk
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isError, setIsError] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // eger kaydolma modundaysa if calisir
    if (isSignUp) {
      createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Account is created", { autoClose: 1000 });
          navigate("/home");
        })
        .catch((err) => toast.error(err.message, { autoClose: 1000 }));

      // giris yapma modundaysa else calisir
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          toast.info("Account is logged in", { autoClose: 1000 });
          navigate("/home");
        })
        .catch((err) => {
          toast.error(err.message, { autoClose: 1000 });
          setIsError(true);
        });
    }

    // inputlardaki verileri al
  };

  const sendEmail = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Email is sent", { autoClose: 1000 });
      })
      .catch((err) => toast.error(err.message, { autoClose: 1000 }));
  };

  // google ile gir

  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      toast.success("Account is logged in", { autoClose: 1000 });
      navigate("/home");
    });
  };

  return (
    <section className="h-screen grid place-items-center">
      <div className="bg-black flex flex-col gap-8 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/public/x-logo.webp" alt="x-logo" />
        </div>

        <h2 className="text-center font-bold">Sign in to X</h2>
        <button
          onClick={handleGoogle}
          className="bg-white flex items-center py-2 px-10 rounded-full gap-3 transition hover:bg-gray-300"
        >
          <img
            className="h-[20px]"
            src="/public/google-logo.svg"
            alt="google"
          />
          <span className="text-black whitespace-nowrap">
            Sign in with Google
          </span>
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="email"
          />

          <label className="mt-5">Password</label>
          <input
            onChange={(e) => setPass(e.target.value)}
            className="text-black rounded mt-1 p-2 outline-none shadow-lg focus:shadow-[gray]"
            type="password"
          />

          <button
            className="mt-10 bg-white text-black rounded-full p-1 font-bold transition hover:bg-gray-300"
            type="submit"
          >
            {isSignUp ? "Create Account" : "Sign in"}
          </button>

          <p onClick={() => setIsSigUp(!isSignUp)} className="mt-5">
            <span className="text-gray-400">
              {isSignUp ? "Already have an account?" : "Don’t have an account?"}
            </span>
            <span className="ms-2 text-blue-400 cursor-pointer">
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </p>
        </form>

        {!isSignUp && isError && (
          <button onClick={sendEmail} className="text-center cursor-pointer">
            Forgot Password?
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
