import CreateAccountComponent, { type Testimonial } from "@/components/ui/create-account"
import { useNavigate } from "react-router-dom"

const sampleTestimonials: Testimonial[] = []

export default function CreateAccountPage() {
  const navigate = useNavigate()

  const handleCreateAccount = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    // Basic validation
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    
    if (!data.agreeToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy")
      return
    }
    
    console.log("Create Account submitted:", {
      fullName: data.fullName,
      email: data.email,
    })
    
    alert("Account created successfully! Please sign in.")
    navigate("/sign-in")
  }

  const handleGoogleSignUp = () => {
    console.log("Google Sign Up clicked")
    navigate("/home")
  }

  const handleSignIn = () => {
    navigate("/sign-in")
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <CreateAccountComponent
        testimonials={sampleTestimonials}
        onCreateAccount={handleCreateAccount}
        onGoogleSignUp={handleGoogleSignUp}
        onSignIn={handleSignIn}
      />
    </div>
  )
}
