// components/RatingWidget.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const RatingWidget = ({ productId, onRatingSubmit }) => {
  const [rating, setRating] = useState(0); // For the selected rating
  const [hoveredRating, setHoveredRating] = useState(0); // For the hovered rating

  const handleStarClick = (star) => {
    setRating(star); // Set the clicked star rating
  };

  const handleStarHover = (star) => {
    setHoveredRating(star); // Set the hovered star rating
  };

  const handleStarLeave = () => {
    setHoveredRating(0); // Reset hovered rating
  };

  const handleSubmit = () => {
    if (rating >= 1 && rating <= 5) {
      onRatingSubmit(productId, rating);
      setRating(0); // Reset after submission
    }
  };

  // Render stars dynamically
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoveredRating || rating) ? "filled" : ""}`}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseLeave={handleStarLeave}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating-widget">
      <div className="stars">{renderStars()}</div>
      <button onClick={handleSubmit} disabled={rating === 0}>
        Submit Rating
      </button>
    </div>
  );
};

RatingWidget.propTypes = {
  productId: PropTypes.number.isRequired,
  onRatingSubmit: PropTypes.func.isRequired
};

export default RatingWidget;
