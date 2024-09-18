"use server";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

const LoginCredentials = async (email: string, password: string) => {
    
  
        try{
          await signIn("credentials", {
            email,
            password,
          });
        
        } catch (error) {
          const err = error as CredentialsSignin
          return err.cause; // Handle unexpected errors
        }

      }


export default LoginCredentials
