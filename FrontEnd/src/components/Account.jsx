// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // استيراد التوجيه
// import { useAuth } from '../store';

// export default function Account() {
//   const { isAuthenticated, user, updateProfile, logout, error, isLoading } = useAuth();
//   const navigate = useNavigate();
  
//   // حالة النموذج
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     password: '',
//   });
//   const [isDirty, setIsDirty] = useState(false); // متابعة ما إذا كانت البيانات قد تغيرت
  
//   // إذا لم يكن المستخدم مسجلاً، يتم توجيهه إلى صفحة تسجيل الدخول
//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => {
//       const updatedData = { ...prevData, [name]: value };
//       setIsDirty(JSON.stringify(updatedData) !== JSON.stringify({ name: user?.name, email: user?.email, password: '' }));
//       return updatedData;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const success = await updateProfile(formData);
//     if (success) {
//       alert('تم تحديث البيانات بنجاح');
//       setIsDirty(false); // Reset dirty flag after successful update
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h1>حساب المستخدم</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>} {/* عرض الأخطاء إذا وجدت */}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>الاسم:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>البريد الإلكتروني:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>كلمة المرور الجديدة:</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="اكتب كلمة المرور الجديدة (اختياري)"
//           />
//         </div>
//         <button type="submit" disabled={isLoading || !isDirty}>
//           {isLoading ? 'جاري التحديث...' : 'تحديث البيانات'}
//         </button>
//       </form>

//       <button onClick={handleLogout}>تسجيل الخروج</button>
//     </div>
//   );
// }
