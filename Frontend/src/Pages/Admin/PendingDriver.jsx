import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function PendingDriver() {
  const { driverID } = useParams();
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/auth/drivers/pending/${driverID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch driver details");
        }
        const data = await response.json();
        setDriver(data);
      } catch (error) {
        toast.error("Failed to load driver details");
        console.error("Error fetching driver details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverDetails();
  }, [driverID]);

  const handleApproveDriver = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`http://localhost:8080/auth/approveDriver/${driverID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error("Failed to approve driver");
      }

      const approvedDriver = await response.json();
      
      // Check if driver is successfully registered
      if (approvedDriver.driverStatues === "Available") {
        toast.success("Driver Registered Successfully!");
        navigate('/admin/*'); // Redirect to dashboard
      } else {
        toast.error("Driver approval failed");
      }
    } catch (error) {
      toast.error("Failed to approve driver");
      console.error("Error approving driver:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeclineDriver = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`http://localhost:8080/auth/declineDriver/${driverID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error("Failed to decline driver");
      }

      toast.success("Driver Declined Successfully");
      navigate('/drivers/pending'); // Redirect to pending drivers list
    } catch (error) {
      toast.error("Failed to decline driver");
      console.error("Error declining driver:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!driver) {
    return <div>Driver not found</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-4 flex-grow">
          <div className="flex items-center gap-4">
            <img
              src={driver.imageUrl}
              alt={driver.driverName}
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h2 className="text-xl font-semibold">{driver.driverName}</h2>
              <p className="text-gray-600">{driver.driverEmail}</p>
            </div>
          </div>
          <div className='flex flex-row gap-5'>
            <h3 className="font-semibold">Driver Status:</h3>
            <p className="text-gray-600">{driver.driverStatues}</p>
          </div>
          <div className='flex flex-row gap-5'>
            <h3 className="font-semibold">NIC Number:</h3>
            <p className="text-gray-600">{driver.driverNic}</p>
          </div>
          <div className='flex flex-row gap-5'>
            <h3 className="font-semibold">Contact:</h3>
            <p className="text-gray-600">{driver.driverPhone}</p>
          </div>
          <div className='flex flex-row gap-5'>
            <h3 className="font-semibold">Address:</h3>
            <p className="text-gray-600">{driver.driverAddress}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 ml-6">
          <button 
            onClick={handleApproveDriver}
            disabled={isProcessing}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Approve'}
          </button>
          <button 
            onClick={handleDeclineDriver}
            disabled={isProcessing}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Decline'}
          </button>
        </div>
      </div>

      {/* Vehicle Detail Section */}
      <div className="mt-6 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Vehicle Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Vehicle Photo</h4>
            <img
              src={driver.carImageUrl}
              alt="Vehicle"
              className="w-full h-80 object-cover rounded-lg border"
            />
          </div>
          <div>
            <h4 className="font-medium mb-2">Vehicle Information</h4>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold w-40">Vehicle Number:</span>
                <span>{driver.vehicalNumber}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-40">Category Type:</span>
                <span>{driver.catType}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-40">Vehicle Model:</span>
                <span>{driver.catModel}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-40">Number of Seats:</span>
                <span>{driver.noOfSeats}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-40">AC Type:</span>
                <span>{driver.acType}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-40">Luggage Type:</span>
                <span>{driver.lagguageType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingDriver;