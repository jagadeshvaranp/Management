import React, { useEffect, useState } from "react";
import { X, User, Mail, Shield } from "lucide-react";
import { useSelector } from "react-redux";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  email: string;
  
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // Get users from Redux
 const reduxUser = useSelector((state: any) => state.usersinfo.currentUser);

useEffect(() => {
  if (!isOpen) return;

  const storedUser = localStorage.getItem("loggedUser");

  if (storedUser) {
    setUser(JSON.parse(storedUser));
    return;
  }

  if (reduxUser) {
    setUser(reduxUser);
    return;
  }

  setUser({
    name: "Guest User",
    email: "guest@example.com",
  });
}, [isOpen, reduxUser]);



  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 p-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-blue-700 rounded-full p-1"
          >
            <X size={20} />
          </button>

          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center text-blue-600 text-3xl font-bold border-4 border-blue-400">
            {user.name?.charAt(0)?.toUpperCase()}
          </div>

          <h2 className="mt-3 text-white text-xl font-bold">{user.name}</h2>
          <p className="text-blue-100 text-sm">{user.role || "User"}</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <User className="text-gray-500 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-400">Full Name</p>
              <p className="text-gray-800 dark:text-white font-medium">
                {user.name}
              </p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Mail className="text-gray-500 mr-3" size={20} />
            <div>
              <p className="text-xs text-gray-400">Email Address</p>
              <p className="text-gray-800 dark:text-white font-medium">
                {user.email}
              </p>
            </div>
          </div>

          {/* {user.role && (
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Shield className="text-gray-500 mr-3" size={20} />
              <div>
                <p className="text-xs text-gray-400">Role</p>
                <p className="text-gray-800 dark:text-white font-medium capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          )} */}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;
