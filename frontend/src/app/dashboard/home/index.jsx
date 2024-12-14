import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import http from '../../../util/HttpHelper';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../components/DashboardLayout';

const ServiceProviderHome = () => {
  const { user } = useContext(AuthContext);

  const handleSaveLocation = async (lat, lng) => {
    try {
      const res = await http.put(
        'provider/location/save',
        { lat, lng },
        {
          params: {
            id: user?.providerProfile?._id,
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user !== null && user?.providerProfile !== null) {
      navigator.geolocation.getCurrentPosition((position) => {
        handleSaveLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [user]);

  const employees = [
    { id: 1, name: 'Jacob Hernandez', rating: 4.5, image: '/assets/employee/employee4.jpeg', services: ['House Cleaning', 'Carpet Cleaning'] },
    { id: 2, name: 'Ethan Miller', rating: 4.7, image: '/assets/employee/employee5.jpeg', services: ['Window Cleaning', 'Deep Cleaning'] },
    { id: 3, name: 'Catherine Allen', rating: 4.6, image: '/assets/employee/employee6.jpeg', services: ['Office Cleaning', 'Retail Cleaning'] }
  ];

  const viewEmployeeDetails = (employeeId) => {
    // Code to view employee details
  };

  return (
    <DashboardLayout
      body={
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Manage Your Employees
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {employees.map(employee => (
                <div key={employee.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img src={employee.image} alt={employee.name} className="w-24 h-24 object-cover rounded-full" />
                  <h3 className="text-lg font-semibold mt-2">{employee.name}</h3>
                  <p className="text-sm">Rating: {employee.rating} Stars</p>
                  <p className="text-sm">Services: {employee.services.join(', ')}</p>
                  <button onClick={() => viewEmployeeDetails(employee.id)} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ServiceProviderHome;
