import "./Opportunities.css";
import { useState, useEffect } from "react";
import jobsData from "./jobs.json";

export default function Opportunities() {
  const [isDeptTypeOpen, setIsDeptTypeOpen] = useState(true);
  const [isEmpTypeOpen, setIsEmpTypeOpen] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [jobs, setJobs] = useState(jobsData.jobs);
  const [selectedDeptTypes, setSelectedDeptTypes] = useState([]);
  const [selectedEmpTypes, setSelectedEmpTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [displayedJobs, setDisplayedJobs] = useState([]);

  useEffect(() => {
    setDisplayedJobs(jobs.slice(0, 5));
  }, [jobs]);

  const showMoreJobs = () => {
    const currentLength = displayedJobs.length;
    const moreJobs = jobs.slice(currentLength, currentLength + 5);
    setDisplayedJobs([...displayedJobs, ...moreJobs]);
  };
  const toggleDeptType = () => {
    setIsDeptTypeOpen(!isDeptTypeOpen);
  };

  const toggleEmpType = () => {
    setIsEmpTypeOpen(!isEmpTypeOpen);
  };

  const toggleLocation = () => {
    setIsLocationOpen(!isLocationOpen);
  };

  useEffect(() => {
    const filteredJobs = jobsData.jobs.filter((job) => {
      const matchesDept =
        selectedDeptTypes.length === 0 ||
        selectedDeptTypes.includes(job.DeptType);
      const matchesEmp =
        selectedEmpTypes.length === 0 || selectedEmpTypes.includes(job.EmpType);
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.Location);
      return matchesDept && matchesEmp && matchesLocation;
    });

    setJobs(filteredJobs);
  }, [selectedDeptTypes, selectedEmpTypes, selectedLocations]);

  const handleDeptTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDeptTypes((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((dept) => dept !== value)
    );
  };

  const handleEmpTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedEmpTypes((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((emp) => emp !== value)
    );
  };

  const handleLocationChange = (e) => {
    const { value, checked } = e.target;
    setSelectedLocations((prevSelected) =>
      checked
        ? [...prevSelected, value]
        : prevSelected.filter((loc) => loc !== value)
    );
  };

  return (
    <div className="opportunities">
      <div className="row-1">
        <h1>Looking for partners or interns?</h1>
      </div>
      <div className="row-2">
        <div className="filters-col">
          <div
            className={`filter-item ${isDeptTypeOpen ? "active" : ""}`}
            onClick={toggleDeptType}
          >
            Department Type
            <img
              src={isDeptTypeOpen ? "arrow-up.png" : "arrow-down.png"}
              alt="Arrow"
              id="arrow"
            />
          </div>
          <div className={`filter-content ${isDeptTypeOpen ? "active" : ""}`}>
            <ul>
              {[
                "Administration",
                "Marketing",
                "Sales",
                "Engineering",
                "Human Resources",
                "Customer Support",
              ].map((dept) => (
                <li key={dept}>
                  <input
                    type="checkbox"
                    name="DeptType"
                    value={dept}
                    id={dept}
                    onChange={handleDeptTypeChange}
                  />
                  {dept}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`filter-item ${isEmpTypeOpen ? "active" : ""}`}
            onClick={toggleEmpType}
          >
            Employment Type
            <img
              src={isEmpTypeOpen ? "arrow-up.png" : "arrow-down.png"}
              alt="Arrow"
              id="arrow"
            />
          </div>
          <div className={`filter-content ${isEmpTypeOpen ? "active" : ""}`}>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="EmpType"
                  value="Full-Time"
                  id="Full-Time"
                  onChange={handleEmpTypeChange}
                />
                Full-Time
              </li>
              <li>
                <input
                  type="checkbox"
                  name="EmpType"
                  value="Part-Time"
                  id="Part-Time"
                  onChange={handleEmpTypeChange}
                />
                Part-Time
              </li>
              <li>
                <div className="internship-project">
                  <div>
                    <input
                      type="checkbox"
                      name="EmpType"
                      value="Internship"
                      id="Internship"
                      onChange={handleEmpTypeChange}
                    />
                    Internship
                  </div>
                </div>
              </li>
              <li>
                <div className="internship-project">
                  <div>
                    <input
                      type="checkbox"
                      name="EmpType"
                      value="Project"
                      id="Project"
                      onChange={handleEmpTypeChange}
                    />
                    Project
                  </div>
                </div>
              </li>
            </ul>{" "}
          </div>
          <div
            className={`filter-item ${isLocationOpen ? "active" : ""}`}
            onClick={toggleLocation}
          >
            Location Type
            <img
              src={isLocationOpen ? "arrow-up.png" : "arrow-down.png"}
              alt="Arrow"
              id="arrow"
            />
          </div>
          <div className={`filter-content ${isLocationOpen ? "active" : ""}`}>
            <ul>
              <li>
                <input
                  type="checkbox"
                  name="Location"
                  value="In-office"
                  id="In-office"
                  onChange={handleLocationChange}
                />
                In-office
              </li>
              <li>
                <input
                  type="checkbox"
                  name="Location"
                  value="Remote"
                  id="Remote"
                  onChange={handleLocationChange}
                />
                Remote
              </li>
            </ul>
          </div>
        </div>
        <div className="jobs-col">
          <h2>Filtered Results</h2>
          <div className="results">
            {displayedJobs.map((job) => (
              <div className="result" key={job.id}>
                <div className="author">
                  <img src="" alt="" />
                  <span>{job.author}</span>
                </div>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <div className="buttons">
                  <div>
                    <button>{job.DeptType}</button>
                    <button>{job.EmpType}</button>
                    <button>{job.Location}</button>
                  </div>
                  <button id="inquire-now">Inquire Now</button>
                </div>{" "}
              </div>
            ))}
            {jobs.length > displayedJobs.length && (
              <span onClick={showMoreJobs} id="show-more">
                Show More
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
