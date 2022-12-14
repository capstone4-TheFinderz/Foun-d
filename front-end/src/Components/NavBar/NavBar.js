import { Link } from "react-router-dom";
import Profile from "../Accounts/Profile/Profile";
import "./NavBar.scss";

import Found4 from "../../Images/Found4.png";

const NavBar = ({
  user,
  users,
  handleUser,
  authenticated,
  handleLogout,
  isOpen,
  setIsOpen,
	model
}) => {
  return (
    <section className="nav-section">
      <div className="center-nav">
			
      <h3 className="text-nav">
          <Link to="/">Home</Link>
        </h3>
				<Link to="/" className="logoLink">
          <img
            className="logo"
            src={Found4}
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
          handleLogout={handleLogout}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
					model={model}
        />
      </div>
    </section>
  );
};

export default NavBar;
