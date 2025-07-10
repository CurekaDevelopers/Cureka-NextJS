import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "./App.css";
import "./admin/styles.css";
import ScrollToTop from "./components/ScrollToTop";
import "./css/aboutus.css";
import "./css/bootstrap.min.css";
import "./css/cart.css";
import "./css/common-styles.css";
import "./css/contactus.css";
import "./css/faq.css";
import "./css/font-awesome.css";
import "./css/fonts.css";
import "./css/footer.css";
import "./css/home.css";
import "./css/loginmodal.css";
import AppRouter from "./routes";

function App() {
  return (
    <div id="main-window" style={{ position: "relative" }}>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} containerClassName="overflow-auto" />
      <AppRouter />
    </div>
  );
}

export default App;
