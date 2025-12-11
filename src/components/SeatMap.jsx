import React from 'react';

const SeatMap = ({ takenSeats, selectedSeats, setSelectedSeats, price }) => {
    // Generate standard 40-seat bus layout (A1-A4 ... J1-J4)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    
    const handleSeatClick = (seatId) => {
        if (takenSeats.includes(seatId)) return; // Do nothing if taken

        if (selectedSeats.includes(seatId)) {
            // Unselect
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            // Select (Max 4 seats for example)
            if(selectedSeats.length >= 4) {
                return alert("You can only select up to 4 seats.");
            }
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow-lg border">
            <h3 className="text-xl font-bold mb-4 text-center">Select Seats</h3>
            
            {/* Driver Seat Icon */}
            <div className="flex justify-end mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center text-white font-bold mb-2">
                    Driver
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-5 gap-3 justify-center mb-6">
                {/* Column Headers */}
                <div className="col-span-2 text-center font-bold">Left</div>
                <div className=""></div> {/* Aisle */}
                <div className="col-span-2 text-center font-bold">Right</div>

                {rows.map(row => (
                    <React.Fragment key={row}>
                        {/* Left Side (1, 2) */}
                        <div 
                            onClick={() => handleSeatClick(`${row}1`)}
                            className={`p-2 text-center rounded cursor-pointer border
                                ${takenSeats.includes(`${row}1`) ? 'bg-red-500 text-white cursor-not-allowed opacity-50' : 
                                  selectedSeats.includes(`${row}1`) ? 'bg-primary text-white' : 'bg-base-200 hover:bg-gray-300'}`}
                        >
                            {row}1
                        </div>
                        <div 
                            onClick={() => handleSeatClick(`${row}2`)}
                            className={`p-2 text-center rounded cursor-pointer border
                                ${takenSeats.includes(`${row}2`) ? 'bg-red-500 text-white cursor-not-allowed opacity-50' : 
                                  selectedSeats.includes(`${row}2`) ? 'bg-primary text-white' : 'bg-base-200 hover:bg-gray-300'}`}
                        >
                            {row}2
                        </div>

                        {/* Walking Aisle */}
                        <div className="w-8"></div>

                        {/* Right Side (3, 4) */}
                        <div 
                            onClick={() => handleSeatClick(`${row}3`)}
                            className={`p-2 text-center rounded cursor-pointer border
                                ${takenSeats.includes(`${row}3`) ? 'bg-red-500 text-white cursor-not-allowed opacity-50' : 
                                  selectedSeats.includes(`${row}3`) ? 'bg-primary text-white' : 'bg-base-200 hover:bg-gray-300'}`}
                        >
                            {row}3
                        </div>
                        <div 
                            onClick={() => handleSeatClick(`${row}4`)}
                            className={`p-2 text-center rounded cursor-pointer border
                                ${takenSeats.includes(`${row}4`) ? 'bg-red-500 text-white cursor-not-allowed opacity-50' : 
                                  selectedSeats.includes(`${row}4`) ? 'bg-primary text-white' : 'bg-base-200 hover:bg-gray-300'}`}
                        >
                            {row}4
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Summary */}
            <div className="text-center border-t pt-4">
                <p>Selected: <strong>{selectedSeats.join(', ') || "None"}</strong></p>
                <p className="text-lg font-bold mt-2">Total Price: ${selectedSeats.length * price}</p>
            </div>
            
            <div className="flex gap-4 justify-center mt-4 text-xs">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-base-200 border"></div> Available</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-primary"></div> Selected</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 opacity-50"></div> Booked</span>
            </div>
        </div>
    );
};

export default SeatMap;