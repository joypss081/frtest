import { redirect } from "next/navigation"
import AuthCheck from "../auth-check"

export default function Home() {
  return (
    <AuthCheck fallback={redirect("/login")}>
      {/* This will only render if the user is authenticated */}
      <iframe src="/gallery" className="h-screen w-full border-0" />
    </AuthCheck>
  )
}

