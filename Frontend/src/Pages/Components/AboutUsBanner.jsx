import React from 'react'
import { CheckCircle, Users, Briefcase, Shield } from "lucide-react";

function AboutUsBanner() {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Block 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:scale-110 transition-transform duration-300 hover:text-blue-500">
          <CheckCircle size={40} className=" mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quality Service</h3>
          <p className="text-gray-600">We ensure top-notch service for all our customers.</p>
        </div>

        {/* Block 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:scale-110 transition-transform duration-300 hover:text-blue-500">
          <Users size={40} className=" mb-4" />
          <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
          <p className="text-gray-600">Our skilled professionals are ready to serve you.</p>
        </div>

        {/* Block 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:scale-110 transition-transform duration-300 hover:text-blue-500">
          <Briefcase size={40} className=" mb-4" />
          <h3 className="text-xl font-semibold mb-2">Professional Work</h3>
          <p className="text-gray-600">We maintain high standards in all our work.</p>
        </div>

        {/* Block 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:scale-110 transition-transform duration-300 hover:text-blue-500">
          <Shield size={40} className=" mb-4" />
          <h3 className="text-xl font-semibold mb-2">Reliable & Secure</h3>
          <p className="text-gray-600">Your trust and safety are our top priorities.</p>
        </div>
      </div>
    </div>
  )
}

export default AboutUsBanner