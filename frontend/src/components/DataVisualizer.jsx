import React from 'react';

const DataVisualizer = ({ data }) => (
  <section>
    <h2>Data Flow Visualization</h2>
    {/* Render your data flow chart here */}
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </section>
);

export default DataVisualizer;
