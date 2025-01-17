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
  Modal,
} from "antd";
import moment from "moment";
import 'moment/locale/tr';
import "./TeacherDashboard.css"


moment.locale('tr');

const { Content } = Layout;

const QUESTIONS_SHEETY_URL =
  "https://v1.nocodeapi.com/azad321/google_sheets/TPiGGQOkKnlSrxnT?tabId=Sayfa2";
const EXAMS_SHEETY_URL =
  "https://v1.nocodeapi.com/azad321/google_sheets/TPiGGQOkKnlSrxnT?tabId=Sayfa3";

function TeacherDashboard( {currentUser}) {
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingExam, setLoadingExam] = useState(false);
  const [numQuestions, setNumQuestions] = useState(1);
  const [isExamModalVisible, setIsExamModalVisible] = useState(false);
  const [isQuestionModalVisible, setIsQuestionModalVisible] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
 

  useEffect(() => {
    fetchQuestions();
    fetchExams();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(QUESTIONS_SHEETY_URL);
      const result = await response.json();
      setQuestions(result.data);
    } catch (error) {
      console.error("Sorular getirilemedi:", error);
      notification.error({ message: "Sorular getirilemedi" });
    }
  };

  const fetchExams = async () => {
    try {
      const response = await fetch(EXAMS_SHEETY_URL);
      const result = await response.json();
      setExams(result.data);
    } catch (error) {
      console.error("Sınavlar getirilemedi:", error);
      notification.error({ message: "Sınavlar getirilemedi" });
    }
  };

  const addQuestion = async (values) => {
    const questionsToAdd = [];
    for (let i = 0; i < numQuestions; i++) {
      questionsToAdd.push({
        examCode: values[`examCode${i}`],
        text: values[`text${i}`],
        choiceA: values[`choiceA${i}`],
        choiceB: values[`choiceB${i}`],
        choiceC: values[`choiceC${i}`],
        choiceD: values[`choiceD${i}`],
        correctAnswer: values[`correctAnswer${i}`],
        points: values[`points${i}`],
      });
    }
    setLoadingQuestion(true);
    try {
      for (const question of questionsToAdd) {
        const response = await fetch(QUESTIONS_SHEETY_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            [
              question.examCode,
              question.text,
              question.choiceA,
              question.choiceB,
              question.choiceC,
              question.choiceD,
              question.correctAnswer,
              question.points
            ]
          ]),
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Soru eklenemedi");
        }
      }
      notification.success({ message: "Sorular başarıyla eklendi!" });
      fetchQuestions(); // Soruları yenile
    } catch (error) {
      console.error("Soru eklenemedi:", error);
      notification.error({ message: "Soru eklenemedi" });
    } finally {
      setLoadingQuestion(false);
    }
  };

  const addExam = async (values) => {
    setLoadingExam(true);
    const examData = {
      code: values.code,
      duration: values.duration ? values.duration.format("HH:mm") : "",
      soruSayisi: numQuestions,
    };
    try {
      const response = await fetch(EXAMS_SHEETY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          [
            examData.code,
            examData.duration,
            examData.soruSayisi
          ]
        ]),
      });
      const result = await response.json();
      if (response.ok) {
        notification.success({ message: "Sınav başarıyla eklendi!" });
        fetchExams(); // Sınavları yenile
      } else {
        throw new Error(result.message || "Sınav eklenemedi");
      }
    } catch (error) {
      console.error("Sınav eklenemedi:", error);
      notification.error({ message: "Sınav eklenemedi" });
    } finally {
      setLoadingExam(false);
    }
  };

  const handleExamModalOpen = (exam) => {
    setCurrentExam(exam);
    setIsExamModalVisible(true);
  };

  const handleQuestionModalOpen = (examCode) => {
    const filteredQuestions = questions.filter(q => q.examCode === examCode);
    setCurrentQuestions(filteredQuestions);
    setIsQuestionModalVisible(true);
  };

  const handleExamModalClose = () => {
    setIsExamModalVisible(false);
    setCurrentExam(null);
  };

  const handleQuestionModalClose = () => {
    setIsQuestionModalVisible(false);
    setCurrentQuestions([]);
  };

  const generateQuestionFields = () => {
    const fields = [];
    for (let i = 0; i < numQuestions; i++) {
      fields.push(
        <div key={i}>
          <h3 style={{color:"white"}}>Soru {i + 1}</h3>
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
    <Layout className="Layout" style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "50px" }}>
        <Form className="Form"
          name="addExam"
          onFinish={addExam}
          style={{ marginBottom: "20px" }}
        >
         
         <h1 >Öğretmen Profili</h1>
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
            label={<span style={{ color: 'white' }}>Eklemek istediğiniz soru sayısı</span>}
            rules={[{ required: true, message: "Soru sayısı gerekli!" }]}
          >
            <InputNumber
              min={1}
              max={10}
              onChange={(value) => setNumQuestions(value)}
            />
          </Form.Item>
          <Form.Item>
            <Button className="Button" type="primary" htmlType="submit" loading={loadingExam}>
              Sınav Ekle
            </Button>
          </Form.Item>
        </Form>

        <Button className="Button"
          type="primary"
          onClick={() => handleExamModalOpen(currentExam)}
          style={{ marginBottom: "20px" }}
        >
          Sınavları Görüntüle
        </Button>

        <Modal
          title="Sınavlar"
          visible={isExamModalVisible}
          onCancel={handleExamModalClose}
          footer={[
            <Button  key="close" onClick={handleExamModalClose}>
              Kapat
            </Button>
          ]}
        >
          <List
            bordered
            dataSource={exams}
            renderItem={(item) => (
              <List.Item >
                <div>
                  <strong>Sınav Kodu: </strong>{item.code}
                  <p><strong>Süre: </strong>{item.duration}</p>
                  <Button
                  className="Button"
                    type="link"
                    onClick={() => handleQuestionModalOpen(item.code)}
                  >
                    Soruları Görüntüle
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Modal>

        <Modal
          title="Sorular"
          visible={isQuestionModalVisible}
          onCancel={handleQuestionModalClose}
          footer={[
            <Button  key="close" onClick={handleQuestionModalClose}>
              Kapat
            </Button>
          ]}
        >
          <List
          
            bordered
            dataSource={currentQuestions}
            renderItem={(item) => (
              <List.Item >
                <div>
                  <strong>Soru: </strong>{item.text}
                  <ul>
                    <li>A. {item.choiceA}</li>
                    <li>B. {item.choiceB}</li>
                    <li>C. {item.choiceC}</li>
                    <li>D. {item.choiceD}</li>
                  </ul>
                  <p><strong>Doğru Cevap: </strong>{item.correctAnswer}</p>
                  <p><strong>Sınav Kodu: </strong>{item.examCode}</p>
                  <p><strong>Puan: </strong>{item.points}</p>
                </div>
              </List.Item>
            )}
          />
        </Modal>

        <Form className="Form"
          name="addQuestion"
          onFinish={addQuestion}
          style={{ marginBottom: "20px" }}
        >
          {generateQuestionFields()}

          <Form.Item>
            <Button className="Button" type="primary" htmlType="submit" loading={loadingQuestion}>
              Soruları Ekle
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
}
export default TeacherDashboard;
