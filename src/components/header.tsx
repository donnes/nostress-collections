import { SignedIn, UserButton } from "@clerk/tanstack-react-start";

export function Header() {
  return (
    <div className="flex items-start justify-between">
      <div />
      <div className="mb-8 flex- space-y-2 text-center">
        <div className="flex items-center space-x-4 justify-center">
          <img src="/nostress.png" alt="NoStress" className="w-10 h-10" />
          <h1 className="text-4xl font-bold text-foreground">
            NoStress - Collections
          </h1>
        </div>
        <p className="text-muted-foreground">
          Gerencie sua própria collection ou confira as collections dos demais
          membros da guild.
        </p>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
