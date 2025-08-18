// import { FaBell, FaQuestionCircle, FaCog } from "react-icons/fa";
// import { Link } from "react-router-dom";

// export default function Header() {
//   return (
//     <header className="bg-white shadow-sm">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
          
//           {/* Left - Logo */}
//           <div className="flex items-center space-x-8">
//             <Link to="/" className="text-2xl font-bold text-green-600">
//               LeadCraft
//             </Link>

//             {/* Desktop Nav */}
//             <nav className="hidden md:flex space-x-6 text-sm font-medium">
//               <Link to="/find-work" className="hover:text-green-600">Find work</Link>
//               <Link to="/deliver-work" className="hover:text-green-600">Deliver work</Link>
//               <Link to="/finances" className="hover:text-green-600">Manage finances</Link>
//               <Link to="/messages" className="hover:text-green-600">Messages</Link>
//             </nav>
//           </div>

//           {/* Right - Search & Icons */}
//           <div className="flex items-center space-x-4">
//             {/* Search bar */}
//             <div className="relative hidden sm:block">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-56 rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//               />
//               <span className="absolute right-3 top-1.5 text-gray-400">🔍</span>
//             </div>

//             {/* Icons */}
//             <FaQuestionCircle className="text-gray-600 hover:text-green-600 cursor-pointer" />
//             <FaBell className="text-gray-600 hover:text-green-600 cursor-pointer" />
//             <FaCog className="text-gray-600 hover:text-green-600 cursor-pointer" />

//             {/* Profile Avatar */}
//             <img
//               src="https://i.pravatar.cc/40" 
//               alt="profile"
//               className="h-8 w-8 rounded-full border border-gray-300"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       <div className="md:hidden border-t bg-white px-4 py-2">
//         <nav className="flex justify-around text-sm font-medium">
//           <Link to="/find-work" className="hover:text-green-600">Find work</Link>
//           <Link to="/deliver-work" className="hover:text-green-600">Deliver work</Link>
//           <Link to="/finances" className="hover:text-green-600">Finances</Link>
//           <Link to="/messages" className="hover:text-green-600">Messages</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }
