
import { SignUp } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function SignUpPage() {

    return (
        <div className="flex flex-col justify-center items-center text-center my-10">
            <h1 className="font-bold text-5xl mb-5">Sign Up</h1>
            <SignUp />
        </div>
    );
}
