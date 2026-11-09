import { useState, type FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
        await signInWithEmailAndPassword(auth, email, password);

        // We'll handle successful login and dashboard navigation next.
    } catch (error) {
        setError("Invalid email or password. Please try again.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label
            htmlFor="email"
            className="mb-2 block font-label text-sm text-espresso">
            Email address
            </label>

            <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-beige bg-white p-3 outline-none focus:border-gold"
            />
        </div>

        <div>
            <label
            htmlFor="password"
            className="mb-2 block font-label text-sm text-espresso">
            Password
            </label>

            <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-beige bg-white p-3 outline-none focus:border-gold"
            />

            {error && (
            <p className="text-sm text-red-600" role="alert">
                {error}
            </p>
            )}
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-gold px-6 py-3 font-body text-sm font-bold text-espresso transition hover:bg-gold-muted disabled:cursor-not-allowed disabled:opacity-60">
            {isLoading ? "Signing in..." : "Sign in"}
        </button>
    </form>
  );
}

export default AdminLogin;