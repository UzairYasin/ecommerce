import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {

    return (
        <div className="flex flex-col justify-center items-center text-center my-10">
            <h1 className="font-bold text-5xl mb-5">Sign In</h1>
            <SignIn />
        </div>
    );
}
