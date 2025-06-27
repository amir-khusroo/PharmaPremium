import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const Dashboard = ({ email }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8081/api/user/${email}`)
            .then((res) => {
                setUser(res.data);
                setLoading(false);
                console.log("User data:", res.data);
            });
    }, [email]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Failed to load profile.</p>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                
                <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661770294094-06167872e079?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGhhcm1hY3l8ZW58MHx8MHx8fDA%3D')` }}>
                    <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                    <div className="h-48 flex items-center justify-center "><div className="p-2 rounded-md text-3xl text-white bg-black bg-opacity-50 font-bold">Pharma Partner Dashboard</div></div>
                </div>

                
                <div className="p-6  relative flex flex-col items-center md:flex-row md:justify-between">
                    <div><h2 className="mt-4 text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>
                        <p className="text-sm text-gray-400">Pharma Partner</p></div>

                    
                    <div className="mt-4">
                        <Button
                            variant="gradient"
                            size="sm"
                            className="lg:inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-600 hover:to-blue-800 focus:from-blue-600 focus:to-blue-800 active:from-blue-700 active:to-blue-900 rounded-lg"
                        >
                            <span>Add Patient Purchase</span>
                        </Button>
                    </div>
                </div>

                {/* Purchase History */}
                <div className="px-6 py-4 border-t">
                    <h3 className="text-xl font-semibold mb-2">Purchase History</h3>
                    <ul className="space-y-2">
                        {/* {profile.purchaseHistory && profile.purchaseHistory.length > 0 ? (
              profile.purchaseHistory.map((item, i) => (
                <li key={i} className="p-3 bg-gray-50 rounded-md shadow-sm flex justify-between items-center">
                  <span>{item.medicineName}</span>
                  <span className="text-sm text-gray-600">{item.date}</span>
                </li>
              ))
            ) : ( */}
                        <p className="text-gray-400">No purchases yet.</p>
                        {/* )} */}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;