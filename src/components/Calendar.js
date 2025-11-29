import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ selectedDate, onDateSelect, disabledDates = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isDisabled = disabledDates.includes(dateStr) || 
                        new Date(year, month, day) < new Date(new Date().setHours(0, 0, 0, 0));
      days.push({ day, dateStr, isDisabled });
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth} className="calendar-nav-btn">‹</button>
        <h3 className="calendar-month-year">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button onClick={goToNextMonth} className="calendar-nav-btn">›</button>
      </div>
      <div className="calendar-weekdays">
        {weekDays.map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-days">
        {days.map((dateInfo, index) => {
          if (dateInfo === null) {
            return <div key={`empty-${index}`} className="calendar-day empty"></div>;
          }
          const isSelected = selectedDate === dateInfo.dateStr;
          return (
            <button
              key={dateInfo.dateStr}
              className={`calendar-day ${isSelected ? 'selected' : ''} ${dateInfo.isDisabled ? 'disabled' : ''}`}
              onClick={() => !dateInfo.isDisabled && onDateSelect(dateInfo.dateStr)}
              disabled={dateInfo.isDisabled}
            >
              {dateInfo.day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

