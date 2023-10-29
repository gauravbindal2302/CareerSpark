import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h1>CareerSpark</h1>
        </div>
        <div className="list-items">
          <ul>
            <li>Home</li>
            <li>Network</li>
            <li>Learn</li>
            <li>Opportunities</li>
          </ul>
        </div>
      </div>
    </>
  );
}
