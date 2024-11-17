import Footer from "~/components/structure/Footer";
import Header from "~/components/structure/Header";
import Main from "~/components/structure/Main";
import PropTypes from "prop-types";

export default function Page({ name, children }) {
  return (
    <div id="pico-root">
      <Header name={name} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

Page.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
