"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api.utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Categories() {
  const [categories, setCategories] = useState();
  useEffect(() => {
    const getCategories = async () => {
      const response = await api.get("/categories");
      if (response.status === 200) {
        setCategories(response.data);
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <Header />
      <Container className="p-4">
        {categories?.map((val) => (
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
