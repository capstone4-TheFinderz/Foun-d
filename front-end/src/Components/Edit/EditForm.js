import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = process.env.API_REACT_API_URL;

export default function EditForm() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [question, setQuestion] = useState({});

  return <div>EditForm</div>;
}
