/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../services/axiosInstance";

const initialState = {
  question: [],
  loading: false,
  error: "",
};

const QuestionContext = createContext(initialState);

export const QuestionProvider = ({ children }) => {
  const [question, setQuestion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          setError("No token found, please login.");
          return;
        }

        const response = await axiosInstance.get("/question", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status === "success") {
          const quest = response.data.data.questions;
          if (quest.length === 0) {
            setError("No questions found");
          }
          setQuestion(quest);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <QuestionContext.Provider
      value={{ question, setQuestion, loading, error }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestion = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useCategories must be used within a QuestionProvider");
  }
  return context;
};