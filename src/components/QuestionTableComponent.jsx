import React, { useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuestion } from "../context/questionContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import StatusButtonsComponent from "../components/StatusButtonsComponent";

const QuestionTableComponent = () => {
  const { question, loading, error } = useQuestion();
  const [deleteError, setDeleteError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const user =  JSON.parse(localStorage.getItem('user'));



  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setDeleteLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setDeleteError("No token found, please login.");
          return;
        }

        await axiosInstance.delete(`/question/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDeleteError(null);
        navigate(0);
      } catch (err) {
        console.error(err);
        setDeleteError("Failed to delete category.");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="pt-4">
      <h2>Question</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {deleteError && <Alert variant="danger">{deleteError}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {question.length > 0 ? (
            question.map((question) => (
              <tr key={question._id}>
                <td>{question.question}</td>
                <td className="w-50">
                  {user.isAdmin ? <StatusButtonsComponent questionId={question._id} />:  <></> }
                  </td>
                <td  className="w-50">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(question._id)}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </Button>
                 
                  <Link to={`/question/${question._id}`}> <Button
                    variant="success"
                  >
                      View
                  </Button></Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No questions available.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default QuestionTableComponent;