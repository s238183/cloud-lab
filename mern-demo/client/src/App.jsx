import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = '/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

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
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { studentId, name, email });
        setEditingId(null);
      } else {
        await axios.post(API_URL, { studentId, name, email });
      }

      setStudentId('');
      setName('');
      setEmail('');
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi lưu dữ liệu:', err);
    }
  };

  const handleEdit = (sv) => {
    setEditingId(sv._id);
    setStudentId(sv.studentId);
    setName(sv.name);
    setEmail(sv.email);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setStudentId('');
    setName('');
    setEmail('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Lỗi khi xóa sinh viên:', err);
      }
    }
  };

  return (
    <div className="container">
      <h1>Quản Lý Sinh Viên_version 2</h1>
      <p style={{ color: 'green', fontWeight: 'bold' }}>Phiên bản: v2.0</p>
      <h2>{editingId ? 'Sửa thông tin sinh viên' : 'Thêm sinh viên'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="MSSV: "
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name: "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Emai: "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        )}
      </form>

      <h2>List</h2>
      <table>
        <thead>
          <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sv) => (
            <tr key={sv._id}>
              <td>{sv.studentId}</td>
              <td>{sv.name}</td>
              <td>{sv.email}</td>
              <td>
                <button onClick={() => handleEdit(sv)}>Sửa</button>
                <button onClick={() => handleDelete(sv._id)} style={{ marginLeft: '8px' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;