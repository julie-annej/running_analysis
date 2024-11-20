"use client";
import React, { useEffect } from 'react';
import { redirect, useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
    const router = useRouter();
    const params = useSearchParams()
    useEffect(() => {
      const sendCode = async () => {
        const response = await fetch(`http://localhost:4200/connect?code=${params.get('code')}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
          },);
        const result = await response.json();
        console.log(result);
      };
  
      sendCode();
      redirect('/home');
      
    }, []); // Empty array ensures this effect runs once on mount
  
  return (
    <div>
    </div>
  );
  
}
