// import { 
//   HomeIcon, 
//   UserIcon, 
//   ClipboardDocumentListIcon, 
//   QuestionMarkCircleIcon,
//   BellIcon,
//   Squares2X2Icon
// } from '@heroicons/react/24/outline';
// import { Link } from 'react-router-dom';

// function Sidebar() {
//   return (
    
//     <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">

//       <div className="p-6 text-2xl font-bold">Admin Panel</div>
//       <nav className="flex flex-col gap-2 mt-6">
//         <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <HomeIcon className="w-5 h-5" /> Dashboard
//         </Link>
//         <Link to="/users" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <UserIcon className="w-5 h-5" /> Users
//         </Link>
//         <Link to="/requests" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <ClipboardDocumentListIcon className="w-5 h-5" /> Requests
//         </Link>
//         <Link to="/faq" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <QuestionMarkCircleIcon className="w-5 h-5" /> FAQ
//         </Link>
//         <Link to="/notifications" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <BellIcon className="w-5 h-5" /> Notifications
//         </Link>

//          <Link to="/reports" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <BellIcon className="w-5 h-5" /> Reports
//         </Link>
//         <Link to="/ranks" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
//           <Squares2X2Icon className="w-5 h-5" /> Ranks 
//         </Link>
//       </nav>
//     </div>
//   );
// }

// export default Sidebar;   

import { 
  HomeIcon, 
  UserIcon, 
  ClipboardDocumentListIcon, 
  QuestionMarkCircleIcon,
  BellIcon,
  Squares2X2Icon,
   WalletIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from "../Assets/abshir.jpg"; // حط صورة الشعار عندك داخل مجلد assets

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col items-center">
      
      {/* شعار دائري بالأعلى */}
      <div className="mt-6 mb-4">
        <img 
          src={logo} 
          alt="Abshir Logo" 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>

      <nav className="flex flex-col gap-2 mt-6 w-full px-4">
        <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <HomeIcon className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/users" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <UserIcon className="w-5 h-5" /> Users
        </Link>
        <Link to="/requests" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <ClipboardDocumentListIcon className="w-5 h-5" /> Requests
        </Link>
        <Link to="/faq" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <QuestionMarkCircleIcon className="w-5 h-5" /> FAQ
        </Link>
        <Link to="/notifications" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <BellIcon className="w-5 h-5" /> Notifications
        </Link>
        <Link to="/reports" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <BellIcon className="w-5 h-5" /> Reports
        </Link>
        <Link to="/ranks" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <Squares2X2Icon className="w-5 h-5" /> Ranks 
        </Link>

        <Link to="/wallet" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <WalletIcon className="w-5 h-5" /> Wallet
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;

