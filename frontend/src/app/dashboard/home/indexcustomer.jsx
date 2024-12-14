import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import http from '../../../util/HttpHelper';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../components/DashboardLayout';

const Home = () => {
  const { user } = useContext(AuthContext);

  const handleSaveLocation = async (lat, lng) => {
    try {
      const res = await http.put(
        'emp/location/save',
        { lat, lng },
        {
          params: {
            id: user?.empProfile?._id,
          },
        }
      );
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user !== null && user?.empProfile !== null) {
      navigator.geolocation.getCurrentPosition((position) => {
        handleSaveLocation(position.coords.latitude, position.coords.longitude);
      });
    }
  }, [user]);

  const services = [
    { id: 1, name: 'House Cleaning', image: '/assets/House Cleaning.jpg', description: 'Routine cleaning tasks such as dusting, vacuuming, mopping, bathroom, and kitchen cleaning.' },
    { id: 2, name: 'Carpet Cleaning', image: '/assets/Carpet Cleaning.jpg', description: 'Techniques such as steam cleaning or dry cleaning to remove stains and deep dirt from carpets.' },
    { id: 3, name: 'Window Cleaning', image: '/assets/Window Cleaning.jpg', description: 'Cleaning of interior and exterior windows, often involving specialized equipment for high-rise buildings.' },
    { id: 4, name: 'Office Cleaning', image: '/assets/Office Cleaning.jpg', description: 'Regular cleaning of office spaces including dusting, vacuuming, trash removal, and restroom sanitation.' },
    { id: 5, name: 'Deep Cleaning', image: '/assets/Deep Clean.jpg', description: 'More intensive cleaning, including areas not usually covered in a regular clean, like behind appliances and inside cabinets.' },
    { id: 6, name: 'Retail Cleaning', image: '/assets/Retail Cleaning.jpg', description: 'Cleaning services tailored for retail spaces, ensuring a clean shopping environment for customers.' },
    { id: 7, name: 'Disinfecting and Sanitizing', image: '/assets/Disinfecting and Sanitizing.jpg', description: 'Routine cleaning tasks such as dusting, vacuuming, mopping, bathroom, and kitchen cleaning.' },
    { id: 8, name: 'Post-Construction Cleaning', image: '/assets//Post-Construction Cleaning.png', description: 'Techniques such as steam cleaning or dry cleaning to remove stains and deep dirt from carpets.' },
    { id: 9, name: 'Move-In/Move-Out Cleaning', image: '/assets/Move-In-Move-Out Cleaning.jpg', description: 'Cleaning of interior and exterior windows, often involving specialized equipment for high-rise buildings.' }
   ];

  const employees = [
    { id: 1, name: 'Benjamin Lee', rating: 4.5, image: '/assets/employee/employee1.jpeg' },
    { id: 2, name: 'Gregory Thomas', rating: 4.7, image: '/assets/employee/employee2.jpeg' },
    { id: 3, name: 'Alexander Ramirez', rating: 4.6, image: '/assets/employee/employee3.jpeg' }
  ];

  return (
    <DashboardLayout
      body={
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {services.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded" />
                  <h3 className="text-xl font-semibold mt-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 mb-12 px-6">
              <h3 className="text-2xl font-semibold">About Mr Clean</h3>
              <p className="mt-4 text-lg text-gray-600">
                At Mr Clean, we believe in providing exceptional quality, reliability, and customer service. Our platform connects you with top-rated professionals in your area to handle all your home maintenance needs efficiently and hassle-free. Experience the convenience of finding trusted and skilled service providers, all at your fingertips!
              </p>
            </div>
            <h2 className="text-3xl font-semibold mt-12 mb-6 text-center">
              Meet Our Top-rated Professionals
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {employees.map(employee => (
                <div key={employee.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <img src={employee.image} alt={employee.name} className="w-24 h-24 object-cover rounded-full" />
                  <h3 className="text-lg font-semibold mt-2">{employee.name}</h3>
                  <p className="text-sm">Rating: {employee.rating} Stars</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Home;
