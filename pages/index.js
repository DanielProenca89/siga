import Login from './login/index'
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Center, LoadingOverlay } from '@mantine/core';
export default function Home() {
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    router.events.on("routeChangeError", (e) => setLoading(false));
    router.events.on("routeChangeStart", (e) => setLoading(true));
    router.events.on("routeChangeComplete", (e) => setLoading(false));
    return () => {

      router.events.off("routeChangeError", (e) => setLoading(false));
      router.events.off("routeChangeStart", (e) => setLoading(true));
      router.events.off("routeChangeComplete", (e) => setLoading(false));
    };

  }, [router.events]);
  
  return (
    <>
    {loading?(<> <Center><LoadingOverlay visible={loading} /></Center></>):
    (<Login></Login>)
}
    </>
    )
}
