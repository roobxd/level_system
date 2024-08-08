'use client'
import { useRouter } from "next/navigation";
import { FunctionComponent, useEffect } from "react";

/**
 * Home Component - literally just for redirecting. 
 * Can probably be solved with middleware too.
 * @returns FunctionComponent 
 */
const Home: FunctionComponent = () => {
    const router = useRouter();
  
    useEffect(() => {
      router.push('auth/login');
    }, [router]);
  
    return <></>; 
  }

  export default Home;