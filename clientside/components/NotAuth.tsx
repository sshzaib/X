import { graphqlClient } from "@/clients/api";
import { verifyGoogleOauthToken } from "@/graphql/query/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { FaXTwitter } from "react-icons/fa6";
export const NotAuth = () => {
  async function handleSuccessGoogleLogin(cred: CredentialResponse) {
    if (!cred || !cred.credential) return console.error("failed to login");
    const data = await graphqlClient.request(verifyGoogleOauthToken, {
      token: cred.credential,
    });
    localStorage.setItem("__x_token", data.GoogleVarification || "");
  }

  return (
    <div>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-7 flex items-center justify-center">
          <FaXTwitter className="text-[20rem]" />
        </div>
        <div className="col-span-5 flex flex-col items-start justify-center">
          <div className="text-7xl font-extrabold">Happening now</div>
          <div className="w-80">
            <div className="text-4xl font-bold mt-16">Join today.</div>
            <div className="mt-8">
              <GoogleLogin
                shape="circle"
                onSuccess={handleSuccessGoogleLogin}
              />
            </div>
            <div className="flex items-center mt-2">
              <div className="grid grid-rows-1 w-1/2 border border-[#2F3336]"></div>
              <div className="mx-2">or</div>
              <div className="grid grid-rows-1 w-1/2 border border-[#2F3336]"></div>
            </div>
            <div className="mt-2">
              <button className="bg-[#1d9bf0] rounded-full w-full p-3">
                Create account
              </button>
            </div>
            <div className="font-semibold mt-20">Already have an account?</div>
            <div className="cursor-pointer w-full">
              <button className="w-full p-3 text-[#1D9BE9] cursor-pointer hover:bg-[#031018] border border-slate-400 mt-2 rounded-full">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
