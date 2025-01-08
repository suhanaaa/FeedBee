import { Check } from "lucide-react";

export default function ListItem({ text }) {
  return (
    <li className="flex items-center space-x-3 text-gray-300">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
        <Check className="w-4 h-4 text-white" />
      </div>
      <span className="text-lg">{text}</span>
    </li>
  );
}
