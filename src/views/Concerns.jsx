"use client";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";

import BootstrapTable from "react-bootstrap-table-next";
import api from "../utils/api.utils";

export default function Concerns() {
  const [concerns, setConcerns] = useState([]);
  useEffect(() => {
    const getConcerns = async () => {
      const response = await api.get("/concerns");
      console.log(response, "concerns");
      if (response.status === 200) {
        setConcerns(response.data);
      }
    };
    getConcerns();
  }, []);
  console.log(concerns);
  // const columns = [
  //   {
  //     id: "id",
  //     name: "title",
  //     image: "img",
  //     description: "text",
  //     status: true,
  //   },
  // ];
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "image",
      text: "Image",
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "status",
      text: "Status",
    },
  ];

  return (
    <div>
      <Header />
      <Container className="p-4">
        <div id="concern-table">
          <BootstrapTable keyField="id" data={concerns} columns={columns} />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
