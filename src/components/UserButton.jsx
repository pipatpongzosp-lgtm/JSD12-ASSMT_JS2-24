// import { useState,useEffect } from "react";

// function UserButton() {
//     const [member,setMember] = useState([])
//   return (
    
//     <div>
//       <button onClick={<TableData />}>Admin Home Section</button>
//     </div>
//   );
// }

// export default UserButton;


import React, { useState, useEffect } from 'react';

const HomeSection = () => {
  // 1. State สำหรับเก็บข้อมูลจาก API และ State เช็คว่าอยู่หน้าไหน
  const [members, setMembers] = useState([]);
  const [activeTab, setActiveTab] = useState('user'); // ค่าเริ่มต้นคือ 'user'

  // 2. ฟังก์ชันสำหรับดึงข้อมูลจาก API
  const fetchMembers = async () => {
    try {
      const response = await fetch('https://67eca027aa794fb3222e43e2.mockapi.io/members');
      const data = await response.json();
      setMembers(data); // เอาข้อมูลที่ได้เก็บลง State
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 3. ใช้ useEffect เพื่อดึงข้อมูลครั้งแรกเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 text-gray-800 font-sans">
      {/* Navbar สไตล์เรียบๆ */}
      <nav className="flex justify-end p-4 border-b border-gray-400">
        <div className="space-x-6 font-bold">
          <a href="#" className="hover:text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600">Owner</a>
        </div>
      </nav>

      {/* เนื้อหาหลัก */}
      <div className="flex flex-col items-center mt-16 px-4">
        <h1 className="text-4xl font-bold mb-2">Generation Thailand</h1>
        <h2 className="text-3xl font-bold mb-10">
          Home - {activeTab === 'user' ? 'User' : 'Admin'} Section
        </h2>

        {/* ปุ่มสลับโหมด */}
        <div className="flex space-x-12 mb-12">
          <button
            onClick={() => setActiveTab('user')}
            className={`px-6 py-3 font-bold rounded shadow-md transition ${
              activeTab === 'user' ? 'bg-white text-black' : 'bg-gray-100 text-gray-500 hover:bg-white'
            }`}
          >
            User Home Section
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-6 py-3 font-bold rounded shadow-md transition ${
              activeTab === 'admin' ? 'bg-white text-black' : 'bg-gray-100 text-gray-500 hover:bg-white'
            }`}
          >
            Admin Home Section
          </button>
        </div>

        {/* ตารางแสดงผล */}
        <div className="w-full max-w-4xl bg-white shadow-sm rounded border border-gray-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-3 text-center text-sm font-bold border-r border-gray-300">Name</th>
                <th className="p-3 text-center text-sm font-bold border-r border-gray-300">Last Name</th>
                <th className="p-3 text-center text-sm font-bold">Position</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3 text-center border-r border-gray-300">{member.name}</td>
                    {/* หมายเหตุ: key ด้านล่างอาจต้องเปลี่ยนตามชื่อฟิลด์จริงจาก API ของคุณ (เช่น lastName) */}
                    <td className="p-3 text-center border-r border-gray-300">{member.lastName || member.lastname || '-'}</td>
                    <td className="p-3 text-center">{member.position || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    กำลังโหลดข้อมูล...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;