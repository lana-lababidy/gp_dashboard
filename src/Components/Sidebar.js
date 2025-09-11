import {
  UserIcon,
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
  BellIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import logo from "../Assets/abshir.jpg"; 

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col items-center">
      
      
      <div className="mt-6 mb-4">
        <img 
          src={logo} 
          alt="Abshir Logo" 
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
        />
      </div>

      <nav className="flex flex-col gap-2 mt-6 w-full px-4">
        <Link to="/dashboard" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <BellIcon className="w-5 h-5" />الاحصائيات
        </Link>
        <Link to="/secret-info" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <UserIcon className="w-5 h-5" /> المستخدمين
        </Link>
        <Link to="/requests" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <ClipboardDocumentListIcon className="w-5 h-5" /> الطلبات
        </Link>
        <Link to="/faq" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <QuestionMarkCircleIcon className="w-5 h-5" /> الأسئلة و الأجوبة
        </Link>
        <Link to="/wallet" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <WalletIcon className="w-5 h-5" /> المحفظة
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;

