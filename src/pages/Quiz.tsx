import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
interface Data {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}
const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([
    {
      category: "",
      correct_answer: "",
      difficulty: "",
      incorrect_answers: [],
      question: "",
      type: "",
    },
  ]);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [score, setScore] = useState<number>(0);
  const fetchData = async () => {
    setIsLoading(true);
    await fetch(
      `https://opentdb.com/api.php?amount=20&category=18&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setIsSuccess(true);
        console.log(data.results);
        setData(data.results);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchData();
    return () => {
      setData([
        {
          category: "",
          correct_answer: "",
          difficulty: "",
          incorrect_answers: [],
          question: "",
          type: "",
        },
      ]);
    };
  }, []);
  if (isloading) {
    return <div>Loading.......</div>;
  }
  if (isError) {
    return <div>Something wrong happend</div>;
  }
  console.log(isSuccess);

  function passScore(_score: number) {
    setScore(_score);
  }
  return (
    <div>
      <div>your Score : {score}</div>
      {isSuccess && (
        <Container qusetions={data} score={score} setScore={passScore} />
      )}

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        back home
      </button>
    </div>
  );
};

export default Quiz;
