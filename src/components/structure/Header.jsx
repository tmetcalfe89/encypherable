import PropTypes from "prop-types";

export default function Header({ name }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <h1>{name}</h1>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};
