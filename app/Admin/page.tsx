"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, FormEvent } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (
      defaultValues.email === process.env.NEXT_PUBLIC_USERNAME &&
      defaultValues.password === process.env.NEXT_PUBLIC_PASSPHRASE
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push("https://iscs-employee-ats.onrender.com");
    } else {
      setError("Invalid credentials");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-screen">

<div className="w-2/3 relative">
        <Image
          src="/Attendance.webp"
          alt="Attendance"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-1/3 p-8 flex flex-col justify-center">
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center justify-center">
            <span className="pr-2 text-xl font-semibold">Admin Credentials</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-key text-[#00674A]"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z" />
              <path d="M15 9h.01" />
            </svg>
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[450px]">
            <div className="animate-spin rounded-full border-t-4 border-[#00674A] border-solid h-16 w-16"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                type="username"
                value={defaultValues.email}
                onChange={(e) => setDefaultValues({ ...defaultValues, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={defaultValues.password}
                onChange={(e) => setDefaultValues({ ...defaultValues, password: e.target.value })}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center mt-5">
              <Button
                type="submit"
                className="w-full bg-[#00674A] text-white hover:bg-[#005a41] transition-colors duration-200"
              >
                Sign In
              </Button>
            </div>
          </form>
        )}
      </div>
      
    </div>
  );
}