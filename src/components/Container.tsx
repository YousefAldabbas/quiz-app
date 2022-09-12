import React, { useState, useEffect } from "react";
import shuffle from "../utils/shuffle";

type qusetions = {
  category: string;
  difficulty: string;
  answers: string[];
  question: string;
  type: string;
};
type ContainerProps = {
  qusetions: {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
  }[];
  score: number;
  setScore: Function;
};

type data = {
  question: string;
  userAnswer: string;
}[];
let arr: string[] = [];
function Container(props: ContainerProps) {
  const [question, setQestion] = useState<qusetions>({
    category: "",
    difficulty: "",
    answers: [""],
    question: "",
    type: "",
  });

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [data, setData] = useState<data>([]);

  useEffect(() => {
    arr = [
      ...props.qusetions[currentQuestion].incorrect_answers,
      props.qusetions[currentQuestion].correct_answer,
    ];
    shuffle(arr);
    setQestion({
      category: props.qusetions[currentQuestion].category,
      difficulty: props.qusetions[currentQuestion].difficulty,
      answers: arr,
      question: props.qusetions[currentQuestion].question,
      type: props.qusetions[currentQuestion].type,
    });

    return () => {};
  }, [currentQuestion,props.qusetions]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    if (
      data.some((ele) => {
        return ele.question === e.target.name;
      })
    ) {
      setData((prev) => {
        const newState = prev.map((obj) => {
          if (obj.question === e.target.name) {
            return { ...obj, userAnswer: e.target.value };
          }
          return obj;
        });
        return newState;
      });
    } else
      setData((prev) => [
        ...prev,
        {
          question: e.target.name,
          userAnswer: e.target.value,
        },
      ]);
  }
  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    data.forEach((ele, i) => {
      let x = props.qusetions.some((q, i) => {
        return (
          q.question === ele.question && q.correct_answer === ele.userAnswer
        );
      });
      x ? props.setScore(props.score + 1) : props.setScore(props.score);
      console.log(x)
    });
    console.log(data);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex  shadow-xl p-2 rounded md:w-[800px] justify-between">
          <div>
            <p className="text-gray-700"> Diffcaulty:{question.difficulty}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: question.question,
              }}
            ></p>
            <div className="flex flex-col justify-between ">
              {arr.map((c, index) => {
                return (
                  <div key={c + index}>
                    <input
                      type="radio"
                      name={question.question}
                      value={c}
                      id={c}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={c}
                      dangerouslySetInnerHTML={{ __html: c }}
                    ></label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="card-actions justify-end self-end">
            <button className="w-[50px] border-2" type="submit">
              submit
            </button>
            <button
              className="w-[50px] border-2"
              type="button"
              onClick={() => {
                setCurrentQuestion(currentQuestion + 1);
                console.log(props.qusetions.length, currentQuestion + 1);
              }}
              disabled={props.qusetions.length === currentQuestion + 1}
            >
              Next
            </button>
          </div>

          <div className="w-[213px] flex flex-wrap md:h-[200px]">
            {props.qusetions.map((q, i) => {
              return (
                <div>
                  <button
                    className={`w-[50px] border-2 ${
                      data.some((ele) => ele.question === q.question)
                        ? "bg-teal-500"
                        : "bg-slate-300"
                    }`}
                    onClick={() => {
                      console.log("clicked");
                      setCurrentQuestion(i);
                    }}
                  >
                    {i + 1}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </form>
      <div
        style={{
          display: "flex",
          maxWidth: "400px",
          maxHeight: "400px",
          overflowX: "scroll",
          flexWrap: "wrap",
          gap: 0,
        }}
      ></div>
    </div>
  );
}

export default Container;
