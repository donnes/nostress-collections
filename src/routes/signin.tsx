import { SignIn as ClerkSignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  return (
    <div className="flex h-full items-center justify-center p-12 bg-gradient-to-bl from-yellow-200 to-white">
      <ClerkSignIn routing="hash" />
    </div>
  );
}
