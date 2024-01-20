import React, {useState} from "react";
import styles from "./Dialogue.module.scss";
import axios from "axios";

function Dialogue(props) {
  const {trigger, setTrigger, question, handleAnswer, quest, tutorial, tutorialOverride} = props;
  const [tutorialChoice, setTutorialChoice] = useState(tutorialOverride);

  let one = 1;
  let two = 2;
  let three = 3;
  let four = 4;

  const getQuestDescription = (index) => {
    const questData = quest.data[index];
    const left = `${questData.collected}/${questData.required}`;

    let mes = ''
    switch (questData.type) {
      case "GAME_1": mes = `Play game #1 ${left} times.`; break;
      case "GAME_2": mes = `Play game #2 ${left} times.`; break;
      case "GAME_3": mes = `Play game #3 ${left} times.`; break;
      case "GAME_4": mes = `Play game #4 ${left} times.`; break;
      case "GAME_5": mes = `Play game #5 ${left} times.`; break;
      case "GAME_6": mes = `Play game #6 ${left} times.`; break;
      case "GAME_7": mes = `Play game #6 ${left} times.`; break;
      case "GAME_8": mes = `Play any minigame ${left} times`; break;  
      case "GAME_9": mes = `Play ${left} different minigames`; break;
      
      case "FRIEND_1": mes = `Text with ${left} friends`; break;
      case "FRIEND_2": mes = `Play any minigame with friends ${left} times`; break;
      case "FRIEND_3": mes = `Play ${left} different minigames with friends`; break;
      
      case "NPC_1": mes =`Do ${left} quizes`; break;
      case "NPC_2": mes =`Score ${left} quiz questions in a row`; break;
      case "NPC_3": mes =`Read ${left} fun facts`; break;
      case "NPC_4": mes =`Interact with superheros ${left} times`; break;

      default:
        return <p>Error: Unrecognized quest type!</p>
    }

    return ( <div>
      <p>{mes}</p>
      <p>Reward: {questData.reward} points</p>
    </div>
    )
  };

  const getTutorial = () => {
    let content = ''
    switch (tutorialChoice) {
      case 1: content = 'This is the tutorial for #1 game'; break;
      case 2: content = 'This is the tutorial for #2 game'; break;
      case 3: content = 'This is the tutorial for #3 game'; break;
      case 4: content = 'This is the tutorial for #4 game'; break;
      case 5: content = 'This is the tutorial for #5 game'; break;
      case 6: content = 'This is the tutorial for #6 game'; break;
      case 7: content = 'This is the tutorial for #7 game'; break;
      case 8: content = 'This is the tutorial for the green game'; break;
    
      default:
        break;
    }

    let header = `Tutorial for #${tutorialChoice}:`;
    if (tutorialChoice == 8) {
      header = 'Tutorial for the Green Game:'
    }

    return <div>
      <h1>{header}</h1>
      {content}
      </div>
  };

  const getDynamicClass = (index) => {
    return tutorial[index].completed ? styles.doneButton : styles.button;
  }

  const handleClose = () => {
    setTrigger(false);
    setTutorialChoice(tutorialOverride);

    console.log(tutorialChoice)
    if (tutorialChoice !== undefined) {
      let toSet = tutorialChoice === 8 ? 0 : tutorialChoice
      
      console.log(`Tutorial ${toSet} done!`)
      console.log(`uuid: ${tutorial[toSet].uuid}`)

      axios.put(`/api/tutorials/${tutorial[toSet].uuid}`, {
        "completed": true
      })
        .then((response) => {
            console.log(tutorialData);
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }

  return (
    trigger && (
     <div className={styles.popupDiv}>
       <div className={styles.popup}>
       {props.children}
          {question && (
            <div className={styles.question}>
              <h4>{question.question}</h4>
              <table>
                <tr>
                  <th><button className={styles.button} onClick={() => handleAnswer(question.correct, one)}>{question.answer_a}</button></th>
                  <th><button className={styles.button} onClick={() => handleAnswer(question.correct, two)}>{question.answer_b}</button></th>
                </tr>
                <tr>
                  <th><button className={styles.button} onClick={() => handleAnswer(question.correct, three)}>{question.answer_c}</button></th>
                  <th><button className={styles.button} onClick={() => handleAnswer(question.correct, four)}>{question.answer_d}</button></th>
                </tr>
              </table>
            </div>
          )}
          {quest && (
            <div>
              <h1>Your Quests:</h1>
              <div className={styles.quest}>
                <h3>Quest One</h3>
                {getQuestDescription(0)}
              </div>
              <div className={styles.quest}>
                <h3>Quest Two</h3>
                {getQuestDescription(1)}
              </div>
            </div>
          )}
          {(tutorial && !tutorialChoice) && (
            <div>
              <h1>Which tutorial would you like to see?</h1>
              <table>
                <tr>
                  <th><button className={getDynamicClass(0)} onClick={() => setTutorialChoice(8)}>Green Game</button></th>
                  <th><button className={getDynamicClass(1)} onClick={() => setTutorialChoice(1)}>Game #1</button></th>
                  <th><button className={getDynamicClass(2)} onClick={() => setTutorialChoice(2)}>Game #2</button></th>
                  <th><button className={getDynamicClass(3)} onClick={() => setTutorialChoice(3)}>Game #3</button></th>
                </tr>
                <tr>
                  <th><button className={getDynamicClass(4)} onClick={() => setTutorialChoice(4)}>Game #4</button></th>
                  <th><button className={getDynamicClass(5)} onClick={() => setTutorialChoice(5)}>Game #5</button></th>
                  <th><button className={getDynamicClass(6)} onClick={() => setTutorialChoice(6)}>Game #6</button></th>
                  <th><button className={getDynamicClass(7)} onClick={() => setTutorialChoice(7)}>Game #7</button></th>
                </tr>
              </table>
            </div>
          )}
          {(tutorial && tutorialChoice) && (
            <div>
              {getTutorial()}
            </div>
          )}
          <button className={styles.closebtn} onClick={handleClose}>
            close
          </button>
        </div>
      </div>
    )
  );
}
export default Dialogue