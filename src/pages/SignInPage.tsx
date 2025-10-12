import SignInComponent, { type Testimonial } from "@/components/ui/sign-in"
import { useNavigate } from "react-router-dom"

const sampleTestimonials: Testimonial[] = []

export default function SignInPage() {
  const navigate = useNavigate()

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log("Sign In submitted:", data)
    navigate("/home")
  }

  const handleGoogleSignIn = () => {
    navigate("/home")
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SignInComponent
        testimonials={sampleTestimonials}
        onSignIn={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        onResetPassword={() => alert("Reset Password clicked")}
        onCreateAccount={() => navigate("/create-account")}
      />
    </div>
  )
}
