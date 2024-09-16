import "../../static/formSubcribe.scss";

const FormSubcribe = () => {
  return (
    // Form đăng ký
    <form className="flex-column subcribe-form">
      <h1>Save time, save money!</h1>
      <p>Sign up and we'll send the best deal to you</p>
      <span>
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </span>
    </form>
  );
};

export default FormSubcribe;
