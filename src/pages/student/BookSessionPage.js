import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Calendar from '../../components/Calendar';
import Modal from '../../components/Modal';
import { therapistsApi, sessionsApi } from '../../api/mockApi';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import './BookSessionPage.css';

const BookSessionPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const loadTherapists = useCallback(async () => {
    try {
      const response = await therapistsApi.getAll();
      setTherapists(response.data);
    } catch (error) {
      showToast('Failed to load therapists', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const loadBookedDates = useCallback(async () => {
    try {
      const response = await sessionsApi.getAll();
      const booked = response.data
        .filter(s => s.status === 'approved')
        .map(s => s.date);
      setBookedDates(booked);
    } catch (error) {
      // Silent fail
    }
  }, []);

  useEffect(() => {
    loadTherapists();
    loadBookedDates();
  }, [loadTherapists, loadBookedDates]);
  const handleTherapistSelect = (therapist) => {
    setSelectedTherapist(therapist);
    setShowModal(true);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      showToast('Please select both date and time', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const result = await sessionsApi.create({
        studentId: user.id,
        studentName: user.name,
        therapistId: selectedTherapist.id,
        therapistName: selectedTherapist.name,
        date: selectedDate,
        time: selectedTime,
        duration: 60,
        notes: ''
      });

      if (result.success) {
        showToast('Session booked successfully! Waiting for approval.', 'success');
        setShowModal(false);
        setSelectedTherapist(null);
        setSelectedDate('');
        setSelectedTime('');
        loadBookedDates();
      }
    } catch (error) {
      showToast('Failed to book session', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">
          <div className="page-container">
            <h1 className="page-title">Book a Therapy Session</h1>
            <p className="page-subtitle">Choose a therapist and schedule your session</p>

            <div className="therapists-grid">
              {therapists.map(therapist => (
                <div key={therapist.id} className="therapist-card">
                  <div className="therapist-avatar">{therapist.image}</div>
                  <h3 className="therapist-name">{therapist.name}</h3>
                  <p className="therapist-specialization">{therapist.specialization}</p>
                  <p className="therapist-experience">{therapist.experience} of experience</p>
                  <p className="therapist-bio">{therapist.bio}</p>
                  <div className="therapist-availability">
                    <strong>Available:</strong> {therapist.availability.join(', ')}
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleTherapistSelect(therapist)}
                    style={{ width: '100%', marginTop: '16px' }}
                  >
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTherapist(null);
        }}
        title={`Book Session with ${selectedTherapist?.name}`}
        size="large"
      >
        {selectedTherapist && (
          <form onSubmit={handleSubmit}>
            <div className="booking-form">
              <div className="booking-section">
                <h3>Select Date</h3>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  disabledDates={bookedDates}
                />
              </div>

              {selectedDate && (
                <div className="booking-section">
                  <h3>Select Time</h3>
                  <div className="time-slots">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="booking-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedTherapist(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!selectedDate || !selectedTime || submitting}
                >
                  {submitting ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default BookSessionPage;

