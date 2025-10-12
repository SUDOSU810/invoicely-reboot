import { NavBar } from "@/components/ui/tubelight-navbar"
import Aurora from "@/components/ui/aurora"
import { Home, History, Settings } from "lucide-react"

const navItems = [
  { name: "Home", url: "/home", icon: Home },
  { name: "History", url: "/history", icon: History },
  { name: "Settings", url: "/settings", icon: Settings },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Aurora Background - Same as Landing Page */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Aurora colorStops={["#1e3a8a", "#3b82f6", "#60a5fa"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>

      {/* Main Content with Navigation */}
      <div className="min-h-screen relative z-10">
        <NavBar items={navItems} />
        <main>
          {children}
        </main>
      </div>
    </>
  )
}
