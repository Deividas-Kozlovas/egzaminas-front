import React, { useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { useQuestion } from "../context/questionContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

const StatusButtonsComponent = (questionId) => {
  const { question, loading, error } = useQuestion();
  const [deleteError, setDeleteError] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const navigate = useNavigate();

  JSON.stringify(questionId);

  const handleStatus = async (questionId, status) => {
    console.log(questionId.questionId)
    try {
      setStatusLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setDeleteError("No token found, please login.");
        return;
      }

      const payload = {
        status: status,
      };

      await axiosInstance.patch(`/question/${questionId.questionId}`,payload, {
        headers: {
          Authorization: `Bearer ${token}`,
       
        },
      });

      setDeleteError(null);
      setStatusLoading(false);
      Alert("nes");
      navigate(0);
    } catch (err) {
      console.error(err);
      setDeleteError("Failed to change status.");
    } finally {
      setStatusLoading
      (false);
    }
  }
  

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="pt-4">
      <Button
        variant="warning"
        onClick={() => handleStatus(questionId, "svarstoma")}
        disabled={statusLoading}
        className="pt-2"
      >
        {statusLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Keiciama...
          </>
        ) : (
          "Svarstoma"
        )}
      </Button>
      <Button
        variant="success"
        onClick={() => handleStatus(questionId, "issprestas")}
        disabled={statusLoading}
      >
        {statusLoading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Keiciama...
          </>
        ) : (
          "Issprestas"
        )}
      </Button>
    </div>
  );
};

export default StatusButtonsComponent;
