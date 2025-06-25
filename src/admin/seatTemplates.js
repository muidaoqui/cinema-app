// seatTemplates.js

export const generateSeatTemplate = ({
  numRows = 6,
  seatsPerRow = 10,
  layoutByRow = {}, // VD: { A: 'regular', C: 'vip', F: 'screenfront' }
  reservedSeats = [] // VD: ['A5', 'C3', 'F1']
} = {}) => {
  const rows = [];
  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < numRows; i++) {
    const rowLabel = rowLabels[i];
    const type = layoutByRow[rowLabel] || 'regular';

    const row = {
      row: rowLabel,
      seats: Array.from({ length: seatsPerRow }, (_, idx) => {
        const seatId = `${rowLabel}${idx + 1}`;
        return {
          id: seatId,
          type,
          reserved: reservedSeats.includes(seatId),
        };
      }),
    };

    rows.push(row);
  }

  return rows;
};
