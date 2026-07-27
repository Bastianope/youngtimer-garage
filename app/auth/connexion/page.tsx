import { SignInForm } from "@/components/layout/sign-in-form";

export default function ConnexionPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-2xl font-bold">Connexion</h1>
      <div className="mt-6">
        <SignInForm />
      </div>
    </div>
  );
}
