import { useState } from "react";

function App() {
  return <AgeCalculator />;
}

export default App;

function AgeCalculator() {
  // User input
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // Error text for each input
  const [errDay, setErrDay] = useState("");
  const [errMonth, setErrMonth] = useState("");
  const [errYear, setErrYear] = useState("");

  // Calculated age according to the given input
  const [ageYears, setAgeYears] = useState("--");
  const [ageMonths, setAgeMonths] = useState("--");
  const [ageDays, setAgeDays] = useState("--");

  const [animate, setAnimate] = useState(false);

  // Trigger handle click by pressing the enter key
  function handleKeyPress(e) {
    if (e.keyCode === 13) {
      handleClick();
    }
  }

  // When button is clicked
  function handleClick() {
    // Maximum number of days in each month
    const ListOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If The day number is greater than 31
    if (day > 31) setErrDay("Must be a valid day");
    // If input field is empty
    else if (!day) setErrDay("This is a required field");
    // If the date is invalid e.g. 31/04/1991 (there are 30 days in April)
    else if (day > ListOfDays[month - 1]) setErrDay("Must be a valid day");
    // If no error
    else setErrDay("");

    // If input field is empty
    if (!month) setErrMonth("This is a required field");
    // The month number is greater than 12
    else if (month > 12) setErrMonth("Must be a valid month");
    else setErrMonth("");

    // If input field is empty
    if (!year) setErrYear("This is a required field");
    // The year is in the future
    else if (year > 2023) setErrYear("Must be in the past");
    // If no error
    else setErrYear("");

    // Creating a date object based on user input
    const inputDate = new Date(`${month}-${day}-${year}`);

    // Checking if the date is valid
    const isValidDate = Date.parse(inputDate);

    // If date is not valid or one of the fields is empty
    if (isNaN(isValidDate) || day === "" || month === "" || year === "") {
      setAgeDays("--");
      setAgeYears("--");
      setAgeMonths("--");
      setAnimate(false);
      return;
    }

    // If no error then calculate the age and set states accordingly
    calculateAge(inputDate);
  }

  function calculateAge(inputDate) {
    // Convert the date strings to Date objects

    // User's date
    const start = new Date(inputDate);

    // Current date
    const end = new Date();

    // Calculate the difference in milliseconds
    const diff = Math.abs(end - start);

    // Calculate the number of milliseconds in a year, month, and day
    const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
    const msPerMonth = msPerYear / 12;
    const msPerDay = 1000 * 60 * 60 * 24;

    // Calculate and set the number of years, months, and days
    setAgeYears(Math.floor(diff / msPerYear));
    setAgeMonths(Math.floor((diff % msPerYear) / msPerMonth));
    setAgeDays(Math.floor((diff % msPerMonth) / msPerDay));
    setAnimate(true);
  }

  return (
    <div className="container">
      <Inputs
        handleKeypress={handleKeyPress}
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        errDay={errDay}
        errMonth={errMonth}
        errYear={errYear}
      />
      <Button day={day} month={month} year={year} handleClick={handleClick} />
      <Output
        ageYears={ageYears}
        ageMonths={ageMonths}
        ageDays={ageDays}
        animate={animate}
      />
    </div>
  );
}

function Inputs({
  handleKeypress,
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
  errDay,
  errMonth,
  errYear,
}) {
  return (
    // Container for all three inputs
    <div className="inputs">
      {/* Each individual input div containing the title, input field and the error message */}
      <div>
        {/* If there is an error, add the red color to the label */}
        <p className={`input-title ${errDay !== "" ? "error-color" : ""}`}>
          Day
        </p>
        <input
          onKeyDown={handleKeypress}
          // If there is an error, add red outline to the input field
          className={`input ${errDay !== "" ? "input-error" : "input-normal"}`}
          value={day}
          onChange={(e) => {
            setDay(Number(e.target.value) < 0 ? day : Number(e.target.value));
          }}
          type="number"
          placeholder="DD"
        />
        {/* If there is an error then show the error text */}
        {errDay !== "" && <p className="error-text">{errDay}</p>}
      </div>
      <div>
        <p className={`input-title ${errMonth !== "" ? "error-color" : ""}`}>
          Month
        </p>
        <input
          onKeyDown={handleKeypress}
          className={`input ${
            errMonth !== "" ? "input-error" : "input-normal"
          }`}
          value={month}
          onChange={(e) => {
            setMonth(
              Number(e.target.value) < 0 ? month : Number(e.target.value)
            );
          }}
          type="number"
          placeholder="MM"
        />
        {errMonth !== "" && <p className="error-text">{errMonth}</p>}
      </div>
      <div>
        <p className={`input-title ${errYear !== "" ? "error-color" : ""}`}>
          Year
        </p>

        <input
          onKeyDown={handleKeypress}
          className={`input ${errYear !== "" ? "input-error" : "input-normal"}`}
          value={year}
          onChange={(e) => {
            setYear(Number(e.target.value) < 0 ? year : Number(e.target.value));
          }}
          type="number"
          placeholder="YYYY"
        />
        {errYear !== "" && <p className="error-text">{errYear}</p>}
      </div>
    </div>
  );
}

function Button({ handleClick }) {
  return (
    <div className="btn-container">
      {/* Horizontal line with the button */}
      <hr className="horizontal-line" />
      <button onClick={handleClick} className="btn">
        {/* Icon inside the button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="39"
          viewBox="0 0 46 44"
        >
          <g fill="none" stroke="#FFF" strokeWidth="2">
            <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
          </g>
        </svg>
      </button>
    </div>
  );
}

function Output({ ageDays, ageMonths, ageYears, animate }) {
  return (
    // Contains all the three lines of output
    <div className="output-container">
      {/* Each individual output */}
      <p className="output">
        <span className={`output-number ${animate ? "output-animation" : ""}`}>
          {ageYears}
        </span>
        years
      </p>
      <p className="output">
        <span className={`output-number ${animate ? "output-animation" : ""}`}>
          {ageMonths}
        </span>
        months
      </p>
      <p className="output">
        <span className={`output-number ${animate ? "output-animation" : ""}`}>
          {ageDays}
        </span>
        days
      </p>
    </div>
  );
}
