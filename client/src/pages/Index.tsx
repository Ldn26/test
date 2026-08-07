import { Navbar } from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import { useState } from "react";
export default function Index() {
const [users, setUsers] = useState([]);
  return (
    <div className="min-h-screen bg-background text-foreground"> 
      <Navbar />
      <button 
      onClick={async () => {
        try {
          // 10.103.74.226
          const response = await fetch("http://10.103.74.226:4000/users");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setUsers(data);
          console.log("Users:", data);
        }
        catch (error) {
          console.error("Error fetching users:", error);
        }
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
GET USERS 
      </button>
      {users.length > 0 && (
        <div>
          <h2>Users:</h2>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
      {/* <ContactUs /> */}
<HeroSection/>
      <Footer />
      
    </div>

      
  );
}
