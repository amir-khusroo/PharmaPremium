import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PurchaseHistory from "./PurchaseHistory";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = ({ email }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/user/${email}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
        console.log("User data:", res.data);
      }).catch((err) => {
        console.error("Error fetching user data:", err);
      });


    axios.get(`${API_URL}/api/patient/getPurchaseHistory`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((res) => {
        setPurchaseHistory(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.error("Error fetching purchase history:", err);
      });
  }, [email]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Failed to load profile.</p>;


  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">

        <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1663047392930-7c1c31d7b785?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D')` }}>
          <div className="absolute inset-0 bg-black bg-opacity-25"></div>
          <div className="h-48 flex items-center justify-center "><div className="p-2 rounded-md text-3xl text-white bg-black bg-opacity-50 font-bold">Patient Dashboard</div></div>
        </div>


        <div className="p-6  relative flex flex-col items-center md:flex-row md:justify-between">
          <div>
            <h2 className="text-center mt-4 text-2xl font-bold md:text-left">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>


          <div className="mt-4 w-full md:w-auto">
            {user.subscription?.active ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
                <p className="text-green-700 font-semibold flex items-center">
                  ✅ Active Subscription
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Plan: <span className="font-medium text-gray-800">{user.subscription.planName}</span>
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Valid till:{" "}
                  <span className="font-medium text-gray-800">
                    {new Date(user.subscription.endDate).toLocaleDateString()}
                  </span>
                </p>

                {/* Buttons row */}
                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={() => navigate("/get-all-subscription")}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Upgrade
                  </button>
                  <button
                    onClick={() => console.log("Cancel subscription clicked")}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl shadow-sm text-center">
                <p className="text-red-700 font-semibold">⚠ No Active Subscription</p>
                <p className="mt-1 text-sm text-gray-600">Subscribe to access all features.</p>
                <button
                  onClick={() => navigate("/get-all-subscription")}
                  className="mt-3 px-4 py-2 w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Buy Subscription
                </button>
              </div>
            )}
          </div>


        </div>

        <div className="px-6 py-4 border-t">
          <h3 className="text-xl font-semibold mb-2">Purchase History</h3>
          <ul className="space-y-2">
            {purchaseHistory && purchaseHistory.length > 0 ? (
              <PurchaseHistory items={purchaseHistory} />
            ) : (
              <p className="text-gray-400">No purchases yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;