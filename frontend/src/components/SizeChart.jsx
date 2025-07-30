import React, { useState } from 'react';

const SizeChart = () => {
  const [showChart, setShowChart] = useState(false);

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  return (
    <div className="relative w-full">
      {/* Button */}
      <button
        onClick={toggleChart}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        View Size Chart
      </button>

      {/* Modal */}
      {showChart && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-lg relative">
            <button
              onClick={toggleChart}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Size Chart (Unisex Oversized)</h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm md:text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Size</th>
                    <th className="p-2 border">Chest (inches)</th>
                    <th className="p-2 border">Length (inches)</th>
                    <th className="p-2 border">Sleeve (inches)</th>
                    <th className="p-2 border">Shoulders (inches)</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border text-center">S</td>
                    <td className="p-2 border text-center">40</td>
                    <td className="p-2 border text-center">26.5</td>
                    <td className="p-2 border text-center">9</td>
                    <td className="p-2 border text-center">18</td>

                  </tr>
                  <tr>
                    <td className="p-2 border text-center">M</td>
                    <td className="p-2 border text-center">42</td>
                    <td className="p-2 border text-center">27.5</td>
                    <td className="p-2 border text-center">9.5</td>
                    <td className="p-2 border text-center">19</td>

                  </tr>
                  <tr>
                    <td className="p-2 border text-center">L</td>
                    <td className="p-2 border text-center">44</td>
                    <td className="p-2 border text-center">28.5</td>
                    <td className="p-2 border text-center">10</td>
                    <td className="p-2 border  text-center">20</td>

                  </tr>
                  <tr>
                    <td className="p-2 border text-center">XL</td>
                    <td className="p-2 border text-center">46</td>
                    <td className="p-2 border text-center">29.5</td>
                    <td className="p-2 border text-center">10.5</td>
                    <td className="p-2 border text-center">21</td>

                  </tr>
                  <tr>
                    <td className="p-2 border text-center">XXL</td>
                    <td className="p-2 border text-center">48</td>
                    <td className="p-2 border text-center">30.5</td>
                    <td className="p-2 border text-center">11</td>
                    <td className="p-2 border text-center">22</td>

                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-500 mt-3 text-center">
              *All measurements are in inches and may vary slightly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizeChart;
