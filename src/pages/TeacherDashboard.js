import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Layout,
  List,
  notification,
  InputNumber,
  TimePicker,
} from "antd";
// import moment from "moment";
// import 'moment/locale/tr';
import "./TeacherDashboard.css"

// moment.locale('tr');

const { Content } = Layout;

// const QUESTIONS_SHEETY_URL =
//   "https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa2";
// const EXAMS_SHEETY_URL =
//   "https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa3";

function TeacherDashboard() {
  // const [questions, setQuestions] = useState([]);
  // const [exams, setExams] = useState([]);
  // const [loadingQuestion, setLoadingQuestion] = useState(false);
  // const [loadingExam, setLoadingExam] = useState(false);
  const [numQuestions, setNumQuestions] = useState(1);

  // useEffect(() => {
  //   fetchQuestions();
  //   fetchExams();
  // }, []);

  // const fetchQuestions = async () => {
  //   try {
  //     const response = await fetch(QUESTIONS_SHEETY_URL);
  //     const result = await response.json();
  //     setQuestions(result.data);
  //   } catch (error) {
  //     console.error("Sorular getirilemedi:", error);
  //     notification.error({ message: "Sorular getirilemedi" });
  //   }
  // };

  // const fetchExams = async () => {
  //   try {
  //     const response = await fetch(EXAMS_SHEETY_URL);
  //     const result = await response.json();
  //     setExams(result.data);
  //   } catch (error) {
  //     console.error("Sınavlar getirilemedi:", error);
  //     notification.error({ message: "Sınavlar getirilemedi" });
  //   }
  // };

  // const addQuestion = async (values) => {
  //   const questionsToAdd = [];
  //   for (let i = 0; i < numQuestions; i++) {
  //     questionsToAdd.push({
  //       examCode: values[`examCode${i}`],
  //       text: values[`text${i}`],
  //       choiceA: values[`choiceA${i}`],
  //       choiceB: values[`choiceB${i}`],
  //       choiceC: values[`choiceC${i}`],
  //       choiceD: values[`choiceD${i}`],
  //       correctAnswer: values[`correctAnswer${i}`],
  //       points: values[`points${i}`],
  //     });
  //   }
  //   setLoadingQuestion(true);
  //   try {
  //     for (const question of questionsToAdd) {
  //       const response = await fetch(QUESTIONS_SHEETY_URL, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify([
  //           [
  //             question.examCode,
  //             question.text,
  //             question.choiceA,
  //             question.choiceB,
  //             question.choiceC,
  //             question.choiceD,
  //             question.correctAnswer,
  //             question.points
  //           ]
  //         ]),
  //       });
  //       const result = await response.json();
  //       if (!response.ok) {
  //         throw new Error(result.message || "Soru eklenemedi");
  //       }
  //     }
  //     notification.success({ message: "Sorular başarıyla eklendi!" });
  //     fetchQuestions(); // Soruları yenile
  //   } catch (error) {
  //     console.error("Soru eklenemedi:", error);
  //     notification.error({ message: "Soru eklenemedi" });
  //   } finally {
  //     setLoadingQuestion(false);
  //   }
  // };

  // const addExam = async (values) => {
  //   setLoadingExam(true);
  //   const examData = {
  //     code: values.code,
  //     duration: values.duration ? values.duration.format("HH:mm") : "",
  //     soruSayisi: numQuestions,
  //   };
  //   try {
  //     const response = await fetch(EXAMS_SHEETY_URL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify([
  //         [
  //           examData.code,
  //           examData.duration,
  //           examData.soruSayisi
  //         ]
  //       ]),
  //     });
  //     const result = await response.json();
  //     if (response.ok) {
  //       notification.success({ message: "Sınav başarıyla eklendi!" });
  //       fetchExams(); // Sınavları yenile
  //     } else {
  //       throw new Error(result.message || "Sınav eklenemedi");
  //     }
  //   } catch (error) {
  //     console.error("Sınav eklenemedi:", error);
  //     notification.error({ message: "Sınav eklenemedi" });
  //   } finally {
  //     setLoadingExam(false);
  //   }
  // };

  const generateQuestionFields = () => {
    const fields = [];
    for (let i = 0; i < numQuestions; i++) {
      fields.push(
        <div key={i}>
          <h3>Soru {i + 1}</h3>
          <Form.Item
            name={`examCode${i}`}
            rules={[{ required: true, message: "Sınav kodu gerekli!" }]}
          >
            <Input placeholder="Sınav Kodu" />
          </Form.Item>
          <Form.Item
            name={`text${i}`}
            rules={[{ required: true, message: "Soru metni gerekli!" }]}
          >
            <Input placeholder="Soru Metni" />
          </Form.Item>
          <Form.Item
            name={`choiceA${i}`}
            rules={[{ required: true, message: "Şık A gerekli!" }]}
          >
            <Input placeholder="Şık A" />
          </Form.Item>
          <Form.Item
            name={`choiceB${i}`}
            rules={[{ required: true, message: "Şık B gerekli!" }]}
          >
            <Input placeholder="Şık B" />
          </Form.Item>
          <Form.Item
            name={`choiceC${i}`}
            rules={[{ required: true, message: "Şık C gerekli!" }]}
          >
            <Input placeholder="Şık C" />
          </Form.Item>
          <Form.Item
            name={`choiceD${i}`}
            rules={[{ required: true, message: "Şık D gerekli!" }]}
          >
            <Input placeholder="Şık D" />
          </Form.Item>
          <Form.Item
            name={`correctAnswer${i}`}
            rules={[{ required: true, message: "Doğru cevap gerekli!" }]}
          >
            <Input placeholder="Doğru Cevap" />
          </Form.Item>
          <Form.Item
            name={`points${i}`}
            rules={[{ required: true, message: "Puan gerekli!" }]}
          >
            <InputNumber placeholder="Puan" />
          </Form.Item>
        </div>
      );
    }
    return fields;
  };

  return (
    <Layout className='Layout' style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px" }}>
        
        <Form className="Form"
          name="addExam"
          // onFinish={addExam}
          style={{ marginBottom: "20px" }}
        >
          <h1 className="h1">Öğretmen Profili</h1>
          <Form.Item
            name="code"
            rules={[{ required: true, message: "Sınav kodu gerekli!" }]}
          >
            <Input className="Input" placeholder="Sınav Kodu" />
          </Form.Item>
          <Form.Item
            name="duration"
            rules={[{ required: true, message: "Süre gerekli!" }]}
          >
            <TimePicker format="HH:mm" placeholder="Süre" showNow={false} />
          </Form.Item>
          <Form.Item
            name="numQuestions"
            label="Kaç soru ekleyeceksiniz?"
            rules={[{ required: true, message: "Soru sayısı gerekli!" }]}
          >
            <InputNumber
              min={1}
              max={10}
              onChange={(value) => setNumQuestions(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button className="Button" type="primary" htmlType="submit" /*loading={loadingExam}*/>
              Sınav Ekle
            </Button>
          </Form.Item>
        </Form>
        <List className="List"
          bordered
          // dataSource={exams}
          renderItem={(item) => (
            <List.Item className="ListItem">
              <div className="ListItem div">
                <strong className="ListItem strong">Sınav Kodu: </strong>
                {item.code}
                <p>
                  <strong className="ListItem strong">Süre: </strong>
                  {item.duration}
                </p>
              </div>
            </List.Item>
          )}
        />
        <Form className="Form"
          name="addQuestion"
          // onFinish={addQuestion}
          style={{ marginBottom: "20px" }}
        >
          {generateQuestionFields()}

          <Form.Item>
            <Button className="Button" type="primary" htmlType="submit" /*loading={loadingQuestion}*/>
              Soruları Ekle
            </Button>
          </Form.Item>
        </Form>
        <List className="List"
          bordered
          // dataSource={questions}
          renderItem={(item) => (
            <List.Item className="ListItem">
              <div className="ListItem div"> 
                <strong className="ListItem strong">Soru: </strong>
                {item.text}
                <ul className="ListItem ul">
                  <li className="ListItem li">A. {item.choiceA}</li>
                  <li className="ListItem li">B. {item.choiceB}</li>
                  <li className="ListItem li">C. {item.choiceC}</li>
                  <li className="ListItem li">D. {item.choiceD}</li>
                </ul>
                <p>
                  <strong className="ListItem strong">Doğru Cevap: </strong>
                  {item.correctAnswer}
                </p>
                <p>
                  <strong className="ListItem strong">Sınav Kodu: </strong>
                  {item.examCode}
                </p>
                <p>
                  <strong className="ListItem strong">Puan: </strong>
                  {item.points}
                </p>
              </div>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
}
export default TeacherDashboard;
