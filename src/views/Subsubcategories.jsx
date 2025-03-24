"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api.utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Subsubcategories() {
  const [subsubcategories, setSubsubcategories] = useState();
  useEffect(() => {
    const getSubsubcategories = async () => {
      const response = await api.get("/subsubcategories");
      if (response.status === 200) {
        setSubsubcategories(response.data);
      }
    };
    getSubsubcategories();
  }, []);
  console.log(subsubcategories);
  return (
    <div>
      <Header />
      <Container className="p-4">
        {subsubcategories?.map((val) => (
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
