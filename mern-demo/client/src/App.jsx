import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://special-guacamole-qvpqqr65gx49f9444-5000.app.github.dev/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (err) {
      console.error('Lỗi khi lấy danh sách sinh viên:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !name || !email) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    try {
      await axios.post(API_URL, { studentId, name, email });
      setStudentId('');
      setName('');
      setEmail('');
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi thêm sinh viên:', err);
    }
  };

  return (
    <div className="container">
      <h1>Quản Lý Sinh Viên</h1>

      <h2>Thêm sinh viên</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Thêm sinh viên</button>
      </form>

      <h2>Danh sách sinh viên</h2>
      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv._id}>
              <td>{sv.studentId}</td>
              <td>{sv.name}</td>
              <td>{sv.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;