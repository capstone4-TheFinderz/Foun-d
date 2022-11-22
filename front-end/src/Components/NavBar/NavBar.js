import { Link } from "react-router-dom";
import Profile from "../Profile/Profile";
import "./NavBar.scss";

import FoundLogo3 from "../../Images/FoundLogo3.png";

const NavBar = ({ user, users, handleUser, authenticated, handleLogout }) => {
  return (
    <section className="nav-section">
      <div className="center-nav">
      <h3 className="text-nav">
          <Link to="/">Home</Link>
        </h3>
        <Link to="/" className="logoLink">
          <img
            className="logo"
            src={FoundLogo3}
            alt="foundLogo"
          />
        </Link>
        <h3 className="text-nav">
          <Link to="/about">About</Link>{" "}
        </h3>
      </div>
      <div className="user-nav">
        <Profile
              user={user}
              users={users}
              handleUser={handleUser}
              authenticated={authenticated}
              handleLogout={handleLogout}/>
      </div>
    </section>
  );
};

export default NavBar;
