import StatsCard from "@/components/StatsCard";
import { ShoppingBag, User, Package } from "lucide-react";
import { useGetAllContacts } from "../../api/contact";
import { useUsersNumber   , useNotificationNumber} from "../../api/users";
import {  } from "@/api/Order";
function Dashboard() {
  const {
    data: notificationsnbr,
    isLoading: notificationNbrLoader,
    isError: isErrorNotifications,
  } = useNotificationNumber(); // Use your data fetching hook here
  const {
    data: usersnbr,
    isLoading: userNbrLoader,
    isError: isErrorUsers,
  }
   = useUsersNumber(); // Use your data fetching hook here

  
   

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Tableau de Bord
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Nombre d’utilisateurs"
          stat={
            isErrorUsers
              ? "Erreur"
              : userNbrLoader
              ? "^._.^"
              : usersnbr.users ?? 0
          }
          icon={<User size={24} />}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="nombre des notifications "
      stat={
            isErrorNotifications
              ? "Erreur"
              : notificationNbrLoader
              ? "^._.^"
              : notificationsnbr.count ?? 0
          }          icon={<ShoppingBag size={24} />}
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />

 


      </div>
  


      </div>
  );
}

export default Dashboard;
