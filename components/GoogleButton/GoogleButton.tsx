"use client";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginWithGmail } from "@/action/auth/login";
import { toast } from "react-toastify";
interface GoogleSignInButtonProps {
  text: string;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ text }) => {
  const clientId = process.env.GOOGLE_CLIENT as string;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={async (response) => {
          const data = await LoginWithGmail(response.credential);
          if (data?.error) {
            toast.error(data.error);
          }
        }}
        onError={() => {
          console.error("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;
