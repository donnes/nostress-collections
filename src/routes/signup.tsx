import { SignUp as ClerkSignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  return (
    <div className="flex h-full items-center justify-center p-12 bg-gradient-to-bl from-yellow-200 to-white">
      <ClerkSignUp routing="hash" />
    </div>
  );
}
