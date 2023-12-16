import React, {useState} from "react";
import styles from "./Dialogue.module.scss";

function Dialogue(props) {
  const {trigger, setTrigger, question, handleAnswer, quest, required, collected} = props;
  let one = 1;
  let two = 2;
  let three = 3;
  let four = 4;
  return (
    trigger && (
     <div className={styles.popupDiv}>
       <div className={styles.popup}>
       {props.children}
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
          {quest && (
            <div>
              <div>Quest One</div>
              <div>Type: {quest.data[0].type}</div>
              <div>Status: {quest.data[0].status}</div>
              <div>Progress: {quest.data[0].collected}/{quest.data[0].required}</div>
              <div>Reward: {quest.data[0].reward}</div>
              <div></div>
              <div>Quest Two</div>
              <div>Type: {quest.data[1].type}</div>
              <div>Status: {quest.data[1].status}</div>
              <div>Progress: {quest.data[1].collected}/{quest.data[1].required}</div>
              <div>Reward: {quest.data[1].reward}</div>
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