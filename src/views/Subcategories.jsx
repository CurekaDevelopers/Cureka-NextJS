"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api.utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState();
  useEffect(() => {
    const getSubcategories = async () => {
      const response = await api.get("/subcategories");
      if (response.status === 200) {
        setSubcategories(response.data);
      }
    };
    getSubcategories();
  }, []);
  console.log(subcategories);
  return (
    <div>
      <Header />
      <Container className="p-4">
        {subcategories?.map((val) => (
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
