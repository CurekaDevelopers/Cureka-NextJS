import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api.utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Brands() {
  const [brands, setBrands] = useState();
  useEffect(() => {
    const getBrands = async () => {
      const response = await api.get("/brands");
      if (response.status === 200) {
        setBrands(response.data);
      }
    };
    getBrands();
  }, []);

  return (
    <div>
      <Header />
      <Container className="p-4">
        {brands?.map((val) => (
          <div key={val.policy_name}>
            <strong>{val.policy_name}</strong>
            <p>{val.policy_content}</p>
          </div>
        ))}
      </Container>
      <Footer />
    </div>
  );
}
