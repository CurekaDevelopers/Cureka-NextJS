"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api.utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Subsubsubcategories() {
  const [subsubsubcategories, setSubsubsubcategories] = useState();
  useEffect(() => {
    const getSubsubsubcategories = async () => {
      const response = await api.get("/subsubsubcategories");
      if (response.status === 200) {
        setSubsubsubcategories(response.data);
      }
    };
    getSubsubsubcategories();
  }, []);
  console.log(subsubsubcategories);
  return (
    <div>
      <Header />
      <Container className="p-4">
        {subsubsubcategories?.map((val) => (
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
