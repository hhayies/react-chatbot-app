import React, { useState, useEffect, useCallback } from "react";
import './assets/styles/style.css';
import { AnswersList, Chats } from "./components/index";
import FormDialog from "./components/Forms/FormDialog";
import { db } from "./firebase/index";
import { collection, getDocs, query } from "firebase/firestore";

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: "question"
    })

    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }

  const selectAnswer = useCallback((selectedAnswer, nextQuestionId) => {
    switch(true) {
      // リンクが選択されたとき
      case(/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = "_blank";
        a.click();
        break;

      // お問い合わせが選択された場合
      case(nextQuestionId === "contact"):
        handleClickOpen();
        break;
        
      // 選択された解答をchatsに追加
      default:
        addChats({
          text: selectedAnswer,
          type: "answer"
        })
        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 500);
        break;
    }
  }, [answers]);

  const addChats = useCallback((chat) => {
    setChats(prevChats => {
      return [...prevChats, chat];
    });
  })

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[setOpen]);

  /**
   * 最初の質問をチャットエリアに表示する
   */
  useEffect(() => {
    (async() => {
      const initDataset = {};
      const q = query(collection(db, "question"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        initDataset[doc.id] = doc.data();
      })
      console.log("hello");
      setDataset(initDataset);
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
  }, []);
  
  /**
   * スクロール一の頂点をスクロール領域の最下層に移動する
   */
  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area");
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer}/>
        <FormDialog open={open} handleClose={handleClose}/>
      </div>
    </section>
  );
}

export default App;
