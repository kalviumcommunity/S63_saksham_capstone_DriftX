import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (image) {
      data.append('avatar', image);
    }

    try {
      setUploading(true);
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      setUploading(false);

      if (res.ok) {
        alert('User registered successfully!');
        console.log('User:', result.user);
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (err) {
      setUploading(false);
      console.error('Registration error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit" disabled={uploading}>
        {uploading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default Register;
