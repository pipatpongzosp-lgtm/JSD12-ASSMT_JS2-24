// import React from 'react'
// import TableData from './TableData'

// function AdminButton() {
//   const db = document.createElement('button')
//   const button = db;
//   return (
//     <div>
//       <button onClick={<TableData/>}>
//         Admin Home Section
//       </button>
//     </div>
//   )
// }

// export default AdminButton
import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  // --- 1. State Management ---
  const [activeTab, setActiveTab] = useState('admin'); // ตั้งค่าเริ่มต้นให้เปิดหน้า Admin
  const [members, setMembers] = useState([]); // เก็บข้อมูลพนักงาน
  
  // State สำหรับฟอร์มสร้าง User
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    position: ''
  });

  const API_URL = 'https://67eca027aa794fb3222e43e2.mockapi.io/members';

  // --- 2. ดึงข้อมูลจาก API (GET) ---
  const fetchMembers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // ดึงข้อมูลทันทีเมื่อโหลดหน้าเว็บ
  useEffect(() => {
    fetchMembers();
  }, []);

  // --- 3. จัดการฟอร์ม (Handle Input) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // --- 4. บันทึกข้อมูล (POST) ---
  const handleSave = async () => {
    // เช็คว่ากรอกข้อมูลครบไหม
    if (!formData.name || !formData.lastName || !formData.position) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // ถ้ายิง API สำเร็จ ให้โหลดข้อมูลตารางใหม่ และล้างค่าในฟอร์ม
        fetchMembers();
        setFormData({ name: '', lastName: '', position: '' });
      } else {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e9eb] font-sans text-black">
      {/* Navbar */}
     

      <div className="flex flex-col items-center mt-12 px-4">
        {/* หัวข้อหลัก */}

        <h2 className="text-4xl font-bold mb-10">
          Home - {activeTab === 'user' ? 'User' : 'Admin'} Section
        </h2>

        {/* ปุ่มเลือกโหมด */}
        <div className="flex space-x-16 mb-12">
          <button
            onClick={() => setActiveTab('user')}
            className={`px-8 py-3 font-bold rounded shadow-sm text-lg transition-colors ${
              activeTab === 'user' ? 'bg-white' : 'bg-gray-50 hover:bg-white'
            }`}
          >
            User Home Section
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-8 py-3 font-bold rounded shadow-sm text-lg transition-colors ${
              activeTab === 'admin' ? 'bg-white outline outline-2 outline-red-900' : 'bg-gray-50 hover:bg-white'
            }`}
          >
            Admin Home Section
          </button>
        </div>

        {/* ส่วนฟอร์ม Admin (แสดงเฉพาะเมื่อ activeTab === 'admin') */}
        {activeTab === 'admin' && (
          <div className="w-full max-w-5xl mb-10">
            <h3 className="text-xl font-bold mb-4">Create User Here</h3>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="flex-1 p-3 rounded shadow-sm border-none focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="flex-1 p-3 rounded shadow-sm border-none focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="Position"
                className="flex-1 p-3 rounded shadow-sm border-none focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <button
                onClick={handleSave}
                className="bg-[#5c6df2] text-white font-bold px-8 py-3 rounded shadow-sm hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* ตารางแสดงข้อมูล */}
        <div className="w-full max-w-5xl">
          <table className="w-full bg-white text-center border-collapse shadow-sm">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-4 font-bold border-r border-gray-300 w-1/3">Name</th>
                <th className="p-4 font-bold border-r border-gray-300 w-1/3">Last Name</th>
                <th className="p-4 font-bold w-1/3">Position</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((member) => (
                  <tr key={member.id} className="border-b border-gray-200">
                    <td className="p-4 border-r border-gray-300">{member.name}</td>
                    {/* ใช้ member.lastName หรือชื่อ key ที่ได้จาก API */}
                    <td className="p-4 border-r border-gray-300">{member.lastName || member.lastname || '-'}</td>
                    <td className="p-4">{member.position || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-8 text-gray-500">
                    กำลังโหลดข้อมูล หรือยังไม่มีข้อมูลในระบบ...
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

export default AdminDashboard;