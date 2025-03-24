"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../utils/api.utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Policies() {
  const [policies, setPolicies] = useState();
  useEffect(() => {
    const getPolicies = async () => {
      const response = await api.get("/policies");
      if (response.status === 200) {
        setPolicies(response.data);
      }
    };
    getPolicies();
  }, []);

  return (
    <div>
      <Header />
      <Container className="p-4">
        {policies?.map((val) => (
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
