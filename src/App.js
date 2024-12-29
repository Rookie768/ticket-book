import React, { useState } from "react";
import "./App.css";

function App() {
  const totalSeats = 84;
  const seatsPerRow = 7;
  const [bookedSeats, setBookedSeats] = useState([]); // Tracks booked seats
  const [inputValue, setInputValue] = useState(""); // Tracks input value
  const [bookedCount, setBookedCount] = useState(0); // Tracks the number of booked seats
  const [availableCount, setAvailableCount] = useState(totalSeats); // Tracks the number of available seats

  const handleBookSeats = () => {
    const numSeats = parseInt(inputValue, 10);
    if (!numSeats || numSeats <= 0 || bookedSeats.length + numSeats > totalSeats) {
      alert("Invalid number of seats. Please try again.");
      return;
    }

    let remainingSeatsToBook = numSeats;
    let newBookedSeats = [...bookedSeats];
    let currentSeatIndex = bookedSeats.length + 1;

    while (remainingSeatsToBook > 0) {
      // Find the row where we can book seats
      const currentRow = Math.floor((currentSeatIndex - 1) / seatsPerRow); // 0-based row index
      const rowStart = currentRow * seatsPerRow + 1;
      const rowEnd = rowStart + seatsPerRow - 1;

      // Check how many seats are available in the current row
      const availableSeatsInRow = Math.min(remainingSeatsToBook, rowEnd - currentSeatIndex + 1);

      // Book seats in the current row
      for (let i = 0; i < availableSeatsInRow; i++) {
        newBookedSeats.push(currentSeatIndex + i);
      }

      remainingSeatsToBook -= availableSeatsInRow;
      currentSeatIndex += availableSeatsInRow;
    }

    // Update booked seats and counts
    setBookedSeats(newBookedSeats);
    setBookedCount(bookedCount + numSeats);
    setAvailableCount(availableCount - numSeats);
    setInputValue(""); // Clear input value
  };

  return (
    <div className="container">
      <div className="left">
        <h1 className="headline">Ticket Booking</h1>
        <div className="maths-copy">
          {Array.from({ length: totalSeats }, (_, index) => {
            const seatNumber = index + 1;
            const isBooked = bookedSeats.includes(seatNumber);
            return (
              <div
                className={`cell ${isBooked ? "booked" : ""}`}
                key={index}
              >
                {seatNumber <= 80 ? seatNumber : ""}
              </div>
            );
          })}
        </div>
        <div className="button-container">
          <button className="button booked-seats">
            Booked Seats = {bookedCount}
          </button>
          <button className="button available-seats">
            Available Seats = {availableCount}
          </button>
        </div>
      </div>
      <div className="right">
        <div className="text-box">
          <div className="row">hello</div>
          <div className="row input-row">
            <input
              type="text"
              placeholder="Enter the number of seats"
              className="input-bar"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="button book-button" onClick={handleBookSeats}>
              Book
            </button>
          </div>
          <div className="row">
            <button
              className="button reset-button"
              onClick={() => {
                setBookedSeats([]);
                setBookedCount(0);
                setAvailableCount(totalSeats);
              }}
            >
              Reset Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
