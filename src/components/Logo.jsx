const Logo = (props) => {
  return (
    <header>
      <img className="logo" src="./src/assets/hoxtagram-logo.png" />
      <button
        onClick={() => {
          props.setShowModal("signIn");
        }}
        className="log-in-button"
      >
        Log in
      </button>
    </header>
  );
};
export default Logo;
