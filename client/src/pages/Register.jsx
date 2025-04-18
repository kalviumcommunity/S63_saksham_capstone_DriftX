import { useState } from 'react';

const Register = () => {
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData, // Don't set content-type manually here
      });

      const data = await res.json();
      setImage(data.imagePath); // This should return "/uploads/filename"
      setUploading(false);
    } catch (error) {
      console.error('Image upload failed:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={uploadFileHandler} />
      {uploading && <p>Uploading...</p>}
      {image && (
        <div>
          <p>Uploaded Image:</p>
          <img src={`http://localhost:5000${image}`} alt="Uploaded" width={200} />
        </div>
      )}
    </div>
  );
};

export default Register;
