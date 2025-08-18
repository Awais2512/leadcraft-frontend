import { Briefcase, FileText } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const cards = [
    {
      title: "Saved Jobs",
      desc: "You have 5 saved jobs.",
      icon: <Briefcase className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Proposals",
      desc: "You sent 3 proposals.",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar firstName="John" lastName="Doe" profilePic={null} />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pt-20 md:ml-64 transition-all">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white p-6 shadow-md rounded-xl flex items-start gap-4 hover:shadow-lg transition"
            >
              <div className="p-3 bg-gray-100 rounded-lg">{card.icon}</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {card.title}
                </h3>
                <p className="mt-1 text-gray-600">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
