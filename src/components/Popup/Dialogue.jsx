import React, {useState} from "react";
import styles from "./Dialogue.module.scss";

function Dialogue(props) {
  const {trigger, setTrigger, question, handleAnswer} = props;
  let one = 1;
  let two = 2;
  let three = 3;
  let four = 4;
  return (
    trigger && (
     <div className={styles.popupDiv}>
       <div className={styles.popup}>
          {question && (
            <div>
              <div>{question.question}</div>
              <button onClick={() => handleAnswer(question.correct, one)}>
                {question.answer_a}
              </button>
              <button onClick={() => handleAnswer(question.correct, two)}>
                {question.answer_b}
              </button>
              <button onClick={() => handleAnswer(question.correct, three)}>
                {question.answer_c}
              </button>
              <button onClick={() => handleAnswer(question.correct, four)}>
                {question.answer_d}
              </button>
            </div>
          )}
          <button className={styles.closebtn} onClick={() => setTrigger(false)}>
            close
          </button>
        </div>
      </div>
    )
  );
}
export default Dialogue