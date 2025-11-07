import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Zap, Users, Trophy, BookOpen, ArrowRight } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Coding Challenges",
      description: "Test your skills with curated coding challenges of varying difficulty levels and earn points.",
    },
    {
      icon: Users,
      title: "Learning Groups",
      description: "Join or create learning groups, collaborate with peers, and accelerate your learning journey.",
    },
    {
      icon: Trophy,
      title: "Leaderboard",
      description: "Compete globally, track your progress, and celebrate your achievements with the community.",
    },
    {
      icon: BookOpen,
      title: "Resources",
      description: "Access a curated library of learning resources, tutorials, and documentation from experts.",
    },
  ]

  const stats = [
    { value: "10K+", label: "Active Learners" },
    { value: "500+", label: "Challenges" },
    { value: "2K+", label: "Resources" },
    { value: "150+", label: "Learning Groups" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center shadow-lg shadow-primary/50">
              <span className="text-foreground font-black text-base">L</span>
            </div>
            <span className="font-black text-xl bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Learnora
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="text-foreground hover:text-primary hover:bg-primary/10">
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/50 text-foreground border-0"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse animation-delay-2000" />

        <div className="text-center max-w-3xl mx-auto space-y-8 relative z-10 fade-in-up">
          <h1 className="text-6xl md:text-7xl font-black text-foreground text-balance leading-tight">
            Master Skills Through <span className="gradient-text animate-pulse">Challenges</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance leading-relaxed">
            Join thousands of learners taking on coding challenges, collaborating in groups, and climbing the global
            leaderboard. Transform your career with Learnora.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg shadow-primary/50 text-foreground border-0 px-8 button-glow"
            >
              <Link href="/auth/signup">Start Learning Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border border-primary/50 hover:bg-primary/10 text-foreground px-8 bg-transparent button-glow"
            >
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary/10 via-card to-accent/10 border-y border-border/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={stat.label} className="scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <p className="text-4xl md:text-5xl font-black gradient-text">{stat.value}</p>
                <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-foreground mb-4">Why Choose Learnora?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master coding skills and grow as a developer
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border border-primary/30 bg-card/50 backdrop-blur-sm card-hover scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-4 border border-primary/50 glow-primary">
                    <Icon className="w-7 h-7 gradient-text" />
                  </div>
                  <h3 className="font-black text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-foreground rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-5xl font-black text-foreground">Ready to Transform Your Skills?</h2>
          <p className="text-lg text-foreground/90 max-w-xl mx-auto">
            Join Learnora today and start your journey to becoming an expert developer. It's free to get started!
          </p>
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="gap-2 bg-foreground text-background hover:bg-foreground/90 font-black px-8"
          >
            <Link href="/auth/signup">
              Create Your Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-background/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-foreground font-black text-sm">L</span>
                </div>
                <h3 className="font-black text-foreground">Learnora</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Master coding skills through challenges and community learning.
              </p>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/challenges" className="hover:text-primary transition-colors">
                    Challenges
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/leaderboard" className="hover:text-primary transition-colors">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard/groups" className="hover:text-primary transition-colors">
                    Groups
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/resources" className="hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-foreground mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/auth/login" className="hover:text-primary transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link href="/auth/signup" className="hover:text-primary transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Learnora. Building the future of learning.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
