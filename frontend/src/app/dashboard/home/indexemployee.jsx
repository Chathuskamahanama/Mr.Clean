import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import http from '../../../util/HttpHelper';
import { toast } from 'react-toastify';
import DashboardLayout from '../../../components/DashboardLayout';

const EmployeeHome = () => {
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

  const upcomingAppointments = [
    { id: 1, customerName: 'Amanda Rodriguez', service: 'House Cleaning', date: '2024-05-15', time: '09:00 AM' },
    { id: 2, customerName: 'Owen Walker', service: 'Carpet Cleaning', date: '2024-05-16', time: '10:30 AM' },
    { id: 3, customerName: 'Richard Roe', service: 'Window Cleaning', date: '2024-05-17', time: '02:00 PM' }
  ];

  const handleCompleteAppointment = (appointmentId) => {
    // Code to mark appointment as completed
  };

  return (
    <DashboardLayout
      body={
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Upcoming Appointments
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <h3 className="text-lg font-semibold mt-2">{appointment.customerName}</h3>
                  <p className="text-sm">Service: {appointment.service}</p>
                  <p className="text-sm">Date: {appointment.date}</p>
                  <p className="text-sm">Time: {appointment.time}</p>
                  <div className="flex justify-center mt-4">
                    <button onClick={() => handleCompleteAppointment(appointment.id)} className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Complete Appointment
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                Additional Information
              </h2>
              <p className="text-lg text-center">You have {upcomingAppointments.length} upcoming appointments. Make sure to arrive on time and provide excellent service to our customers!</p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EmployeeHome;
