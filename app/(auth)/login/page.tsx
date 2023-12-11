import { Metadata } from "next";
import { UserAuthForm } from "./components/AuthForm";

export const metadata: Metadata = {
  title: "ورود",
  description: "ورود",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative  items-center justify-center md:grid lg:max-w-none lg:px-0 h-full">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">ورود</h1>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              طراحی و توسعه توسط فرید بی غم (09362712519)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
