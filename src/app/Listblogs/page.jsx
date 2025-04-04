"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import api from "../../utils/api.utils";
import Footer from "../../views/Footer";
import Header from "../../views/Header/index";
import ShopHeader from "@/views/Header/ShopHeader";

export default function Listblogs() {
  const [listblogs, setListblogs] = useState();
  useEffect(() => {
    const getListblogs = async () => {
      const response = await api.get("/listblogs");
      if (response.status === 200) {
        setListblogs(response.data);
      }
    };
    getListblogs();
  }, []);

  return (
    <div>
      <ShopHeader />
      <Container className="p-4">
        {listblogs?.map((val) => (
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
