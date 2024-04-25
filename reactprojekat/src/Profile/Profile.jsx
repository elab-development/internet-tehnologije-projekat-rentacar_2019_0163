import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const token = sessionStorage.getItem('token');

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/dokumenti', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDocuments(response.data.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rezervacije', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReservations(response.data.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    if (token) {
      fetchUser();
      fetchReservations();
      fetchDocuments();
    }
  }, [token]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document_type', documentType);
    formData.append('document_number', documentNumber);
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/dokumenti', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Document uploaded successfully:', response.data);
      fetchDocuments();
      setDocumentType('');
      setDocumentNumber('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleDownload = async (documentId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/dokumenti/${documentId}/download`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'document.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const handleDelete = async (documentId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/dokumenti/${documentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-info">
        <h1>User Profile</h1>
        {user && (
          <div>
            <h2>User Info</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      <div className="reservations-table">
        <h2>Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Automobile</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Insurance</th>
              <th>Price</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{reservation.auto.marka + ' ' + reservation.auto.model}</td>
                <td>{reservation.datum_od}</td>
                <td>{reservation.datum_do}</td>
                <td>{reservation.osiguranje ? 'Yes' : 'No'}</td>
                <td>{reservation.cena}</td>
                <td>{reservation.napomena}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="upload-document">
        <h2>Upload Document</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="document_type">Document Type:</label>
          <input
            type="text"
            id="document_type"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          />
          <label htmlFor="document_number">Document Number:</label>
          <input
            type="text"
            id="document_number"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
          />
          <label htmlFor="file">Choose File:</label>
          <input type="file" id="file" onChange={handleFileChange} required />
          <button type="submit">Upload</button>
        </form>
      </div>

      <div className="documents">
        <h2>Uploaded Documents</h2>
        <ul>
          {documents.map((document) => (
            <li key={document.id}>
              <button onClick={() => handleDownload(document.id)}>
                {document.document_type} - {document.document_number}
              </button>
              <button onClick={() => handleDelete(document.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
