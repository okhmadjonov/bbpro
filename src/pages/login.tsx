import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "@/Components/Loader/Loader";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const LoginForm = dynamic(() => import("@/Features/login"), {
  loading: () => <Loader />,
});

function Login() {
  const [loading, setLoading] = useState(false);
  const [errIs, setErrIs] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const getData = async (data: any) => {
    setLoading(true);
    try {
      const respons = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      }).finally(() => {
        setLoading(false);
      });
      if (respons?.status === 200 && respons?.error === null) {
        setErrIs("");
        router.push("/admin");
      } else {
        if (respons?.error === "Invalid login or password") {
        } else {
          setErrIs("Invalid login or password");
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return <LoginForm getData={getData} errIs={errIs} loading={loading} />;
}

export default Login;
