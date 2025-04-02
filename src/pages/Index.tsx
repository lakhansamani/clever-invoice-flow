
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { File, Check, Shield, BarChart } from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: <File className="h-10 w-10 text-primary" />,
      title: "Easy Invoicing",
      description: "Create and send professional invoices in seconds. Customize templates to match your brand.",
    },
    {
      icon: <Check className="h-10 w-10 text-primary" />,
      title: "Payment Tracking",
      description: "Track payments and get notified when clients pay. Send automated reminders for overdue invoices.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-primary" />,
      title: "Financial Insights",
      description: "Generate reports to understand your business performance and make informed decisions.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Reliable",
      description: "Your data is encrypted and securely stored. We take privacy and security seriously.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center space-x-2">
            <File className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">InvoicePro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/#features" className="text-sm font-medium hover:text-primary">Features</Link>
            <Link to="/#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
            <Link to="/login" className="text-sm font-medium hover:text-primary">Login</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="hidden sm:block">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white pt-16 pb-24 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Painless Invoicing for<br className="hidden sm:block" /> Modern Businesses
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional invoices, manage customers, and get paid faster with our simple yet powerful invoicing platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started for Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Log in to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Manage Invoices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to streamline your invoicing?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that use InvoicePro to send professional invoices and get paid faster.
          </p>
          <Link to="/signup">
            <Button size="lg">Start Your Free Trial</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <File className="h-6 w-6" />
                <span className="text-xl font-bold">InvoicePro</span>
              </div>
              <p className="text-gray-400">
                Simple invoicing for modern businesses
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} InvoicePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
