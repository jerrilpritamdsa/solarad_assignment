

import TemperatureChart from './components/Chart.jsx';

function App() {
  return (
    <div>
      <div>
        <h1>
          Temperature Chart of the month of feb
        </h1>
        <div className='container' >
          <TemperatureChart />
        </div>

      </div>
    </div>
  );
}

export default App;
