// import AdminButton from "./components/AdminButton";
// import UserButton from "./components/UserButton";
// import Navbar from "./components/Navbar";

// function Home() {
 
//   return (
//     <>
//       <Navbar/>
//       <div className="pt- flex justify-center text-5xl font-bold">
//       <h1>
//         Generation Thailand <br/>
//         React - Assessment
//       </h1>
//     </div>
//        <AdminButton/>
       
//     </>
//   )
// }
// export default Home

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from'./components/Hero';
// URL จาก API Specification ที่ให้มา
const API_URL = 'https://67eca027aa794fb3222e43e2.mockapi.io/members';

export default function Home() {
 
  const [sector, setSector] = useState(''); // '' (เริ่มต้น) | 'user' | 'admin'
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: '', lastName: '', position: '' });

  // ฟังก์ชันดึงข้อมูลพนักงาน (GET)
  const fetchMembers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  // ดึงข้อมูลเมื่อมีการเลือก Sector (User หรือ Admin)
  useEffect(() => {
    if (sector !== '') {
      fetchMembers();
    }
  }, [sector]);

  // ฟังก์ชันจัดการฟอร์ม
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ฟังก์ชันสร้างพนักงานใหม่ (POST)
  const handleSave = async () => {
    if (!formData.name || !formData.lastName || !formData.position) return;
    
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setFormData({ name: '', lastName: '', position: '' }); // รีเซ็ตฟอร์ม
      fetchMembers(); // โหลดข้อมูลใหม่หลังจากบันทึก
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  // ฟังก์ชันลบพนักงาน (DELETE)
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchMembers(); // โหลดข้อมูลใหม่หลังจากลบ
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // กำหนดหัวข้อตาม Sector ที่เลือก
  const getTitle = () => {
    if (sector === 'user') return 'Generation Thailand Home - User Sector';
    if (sector === 'admin') return 'Generation Thailand Home - Admin Sector';
    return 'Generation Thailand React - Assessment';
  };


  return (
    <>
  
     <Navbar/>
     <Hero />

    <div className="content">
      <h1>{getTitle()}</h1>
      
      <div className="button-group">
        <button 
          className={`btn ${sector === 'user' ? 'active' : ''}`}
          onClick={() => setSector('user')}
        >
          User Home Sector
        </button>
        <button 
          className={`btn ${sector === 'admin' ? 'active' : ''}`}
          onClick={() => setSector('admin')}
        >
          Admin Home Sector
        </button>
      </div>

      {/* 1. ส่วนของฟอร์ม: จะแสดงเฉพาะเมื่อเป็น 'admin' เท่านั้น */}
      {sector === 'admin' && (
        <div className="form-section">
          <h3>Create User Here</h3>
          <div className="form-group">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}

      {/* 2. ส่วนของตาราง: จะแสดงเมื่อเลือก sector ใดก็ได้ (ยกเว้นตอนหน้าแรกที่ยังไม่กดปุ่ม) */}
      {sector !== '' && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last Name</th>
                <th>Position</th>
                {/* ปุ่ม Delete จะแสดงเฉพาะ Admin เท่านั้น */}
                {sector === 'admin' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.lastName}</td>
                  <td>{member.position}</td>
                  {sector === 'admin' && (
                    <td>
                      <span className="delete-text" onClick={() => handleDelete(member.id)}>
                        Delete
                      </span>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
}