import ButtonLogin from "@/components/ButtonLogin";
import Link from "next/link";
import ListItem from "@/components/ListItem";
import FAQListItem from "@/components/FAQListItem";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-[#1F2937]">
      {/* HEADER */}
      <header className="bg-[#1F2937]/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
        <div className="relative navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center py-4">
          {/* Logo on the left */}
          <div className="flex-none">
            <Link
              href="/"
              className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              FeedBee
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="hidden md:flex space-x-4">
              <Link
                href="#pricing"
                className="text-gray-300 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-orange-400 font-medium transition-colors duration-300"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-gray-300 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-500 hover:to-orange-400 font-medium transition-colors duration-300"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Button on the right */}
          <div className="flex-none ml-auto">
            <ButtonLogin
              session={session}
              extraStyle="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90"
            />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 aspect-square w-[800px] rounded-full bg-gradient-to-r from-purple-900 via-pink-900 to-orange-900 opacity-20 blur-3xl" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-800 to-pink-800 opacity-10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-orange-800 to-pink-800 opacity-10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl sm:text-6xl lg:text-6xl font-extrabold mb-6 text-gray-300">
            Gather Valuable{" "}
            <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Feedback
            </span>{" "}
            Effortlessly
          </h1>
          <div className="text-xl mb-8 text-gray-400">
            Easily collect feedback for your products, services, or ideas.
            Create boards to organize suggestions, prioritize improvements, and
            make informed decisions to better meet your audience's needs.
          </div>
          <ButtonLogin
            session={session}
            extraStyle="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 px-8 py-3 text-lg"
          />
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#1a232e]"
      >
        <div className="max-w-3xl mx-auto text-center relative">
          <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent uppercase tracking-wider mb-2">
            Pricing
          </p>
          <h2 className="text-4xl font-bold mb-16 text-gray-200">
            A Pricing that adapts to your needs
          </h2>

          <div className="bg-[#1F2937]/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-800 relative overflow-hidden">
            <div className="relative">
              <div className="mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                  ₹99.00
                </div>
                <div className="text-gray-400 text-lg">/month</div>
              </div>
              <ul className="space-y-4 mb-8 max-w-sm mx-auto">
                <ListItem text="Collect customer feedback" />
                <ListItem text="Unlimited boards" />
                <ListItem text="Admin dashboard" />
                <ListItem text="24/7 support" />
              </ul>
              <ButtonLogin
                session={session}
                extraStyle="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#1F2937]"
      >
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent uppercase tracking-wider mb-2">
              FAQ
            </p>
            <h2 className="text-4xl font-bold text-gray-200">
              Frequently Asked Questions
            </h2>
          </div>

          <ul className="space-y-6">
            {[
              {
                question: "What do I get exactly?",
                answer:
                  "With FeedBee, you get a complete feedback management solution. This includes unlimited feedback boards, real-time collaboration tools, advanced analytics, and priority customer support to help you make the most of customer insights.",
              },
              {
                question: "How does the pricing work?",
                answer:
                  "Our pricing is straightforward - ₹99/month gets you access to all features with no hidden costs. You can cancel anytime, and we offer a 14-day free trial to test everything out.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes! We offer a 14-day free trial with full access to all features. No credit card required to start your trial period.",
              },
              {
                question: "What kind of support do you offer?",
                answer:
                  "We provide 24/7 customer support through email and chat. Our dedicated support team is always ready to help you make the most of FeedBee.",
              },
            ].map((qa) => (
              <FAQListItem
                key={qa.question}
                qa={qa}
                className="bg-[#1F2937]/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-800 hover:shadow-md transition-shadow duration-200"
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
