import { Suspense } from "react";
import { SignInScreen } from "@/components/auth";

export default function SignInPage() {
  return (
    <Suspense>
      <SignInScreen />
    </Suspense>
  );
}
