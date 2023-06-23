function App() {
  return <AgeCalculator />;
}

export default App;

function AgeCalculator() {
  return (
    <div className="container">
      <Inputs />
      <Button />
      <Output />
    </div>
  );
}

function Inputs() {
  return (
    <div className="inputs">
      <div>
        <p className="input-title">Day</p>
        <input className="input" type="number" placeholder="DD" />
        <p className="error-text">This field is required</p>
      </div>
      <div>
        <p className="input-title">Month</p>
        <input className="input" type="number" placeholder="MM" />
        <p className="error-text">This field is required</p>
      </div>
      <div>
        <p className="input-title">Year</p>

        <input className="input" type="number" placeholder="YYYY" />
        <p className="error-text">This field is required</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="btn-container">
      <hr className="horizontal-line" />
      {/* <button className="btn">Submit</button> */}
      <button className="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="39"
          viewBox="0 0 46 44"
        >
          <g fill="none" stroke="#FFF" stroke-width="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
          </g>
        </svg>
      </button>
    </div>
  );
}

function Output() {
  return (
    <div className="output-container">
      <p className="output">
        <span className="output-number">--</span> years
      </p>
      <p className="output">
        <span className="output-number">--</span> months
      </p>
      <p className="output">
        <span className="output-number">--</span> days
      </p>
    </div>
  );
}
