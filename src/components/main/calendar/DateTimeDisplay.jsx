import React from 'react';
import PropTypes from 'prop-types';

function DateTimeDisplay({ dateTime }) {
  const originalDateTime = new Date(dateTime);
  const modifiedDateTime = new Date(
    originalDateTime.getTime() - 9 * 60 * 60 * 1000,
  );

  const formattedDateTime = modifiedDateTime.toLocaleString('ko', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return <div>{formattedDateTime}</div>;
}

export default DateTimeDisplay;
