import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestion } from "../context/questionContext";


const IndividualQuestionPage = () => {
  const { questionId } = useParams();
  const { question, loading: questionLoading, error: questionError } = useQuestion();
  const [quest, setQuest] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const selectedQuestion = question.find((ad) => ad._id === questionId);
    if (selectedQuestion) {
      setQuest(selectedQuestion);
      const category = question.find(
        (cat) => cat._id === selectedQuestion.question
      );
      setCategoryTitle(category ? category.title : "No category");
    }
  }, [questionId, question]);

  if (questionLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="container mt-5">
      {questionError && <Alert variant="danger">{questionError}</Alert>}

      {quest ? (
        <Card>
          <Card.Body>
            <Card.Title>{quest.question}</Card.Title>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="danger">questions not found.</Alert>
      )}

      <Button
        variant="secondary"
        onClick={() => navigate("/")}
        className="mt-3"
      >
        Back
      </Button>
      {/* <CommentsFormComponent questionId={questionId} />
      <CommentsTableComponent questionId={questionId} /> */}
    </div>
  );
};

export default IndividualQuestionPage;