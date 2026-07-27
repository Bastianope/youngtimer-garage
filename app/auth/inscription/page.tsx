import { SignUpForm } from "@/components/layout/sign-up-form";

export default function InscriptionPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="text-2xl font-bold">Inscription</h1>
      <div className="mt-6">
        <SignUpForm />
      </div>
    </div>
  );
}
