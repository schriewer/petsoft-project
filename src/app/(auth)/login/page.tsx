import AuthForm from "@/components/auth-form";
import H1 from "@/components/H1";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <H1>Login page</H1>
      <AuthForm />
      <p>
        No account yet?
        <Link href="/signup" className="mt-6 text-sm text-zinc-500">
          {" "}
          Sign up
        </Link>
      </p>
    </main>
  );
}
