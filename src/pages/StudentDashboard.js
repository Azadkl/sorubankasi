import React, { useState, useEffect } from 'react';
import { Layout, List, notification, Button } from 'antd';

const { Content } = Layout;

const EXAMS_SHEETY_URL = 'https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa3';
const QUESTIONS_SHEETY_URL = 'https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa2';
const RESULTS_SHEETY_URL = 'https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa4';

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch(EXAMS_SHEETY_URL);
      const result = await response.json();
      console.log(result); // API'den dönen veriyi konsola yazdır

      if (result.data && Array.isArray(result.data)) {
        const formattedExams = result.data.map(exam => ({
          fields: exam
        }));
        setExams(formattedExams);
      } else {
        throw new Error('Invalid exams data format');
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Sınavlar yüklenemedi' });
    }
  };

  const fetchQuestions = async (examCode) => {
    try {
      const url = `${QUESTIONS_SHEETY_URL}&filterByFormula=${encodeURIComponent(`examCode="${examCode}"`)}`;
      console.log(`Fetching questions for exam code: ${examCode}`);
      const response = await fetch(url);
      const result = await response.json();
      console.log(result); // API'den dönen veriyi konsola yazdır

      if (result.data && Array.isArray(result.data)) {
        const formattedQuestions = result.data.map(question => ({
          fields: question
        }));
        setQuestions(formattedQuestions);
        setCurrentExam(examCode);

        // Öğrencinin soruları çözüp sonuçları doldurması ve puan hesaplama
        const generatedResults = formattedQuestions.map(question => {
          const isCorrect = getRandomBoolean();
          return {
            question: question.fields.text,
            result: isCorrect ? 'Correct' : 'Incorrect',
            score: isCorrect ? parseInt(question.fields.points, 10) : 0
          };
        });
        setResults(generatedResults);

        // Toplam puanı hesaplama
        const totalScore = generatedResults.reduce((sum, result) => sum + result.score, 0);
        setTotalScore(totalScore);
      } else {
        throw new Error('Invalid questions data format');
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Sorular yüklenemedi' });
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <h1>Öğrenci Paneli</h1>
        <List
          bordered
          dataSource={exams}
          renderItem={item => {
            const code = item.fields?.code;
            if (!code) {
              console.error('Invalid exam item:', item);
              return null;
            }
            return (
              <List.Item>
                Sınav Kodu: {code}
                <Button onClick={() => fetchQuestions(code)} style={{ marginLeft: '10px' }}>
                  Sınavı Görüntüle
                </Button>
              </List.Item>
            );
          }}
        />
        {currentExam && (
          <div>
            <h2>Sınav: {currentExam}</h2>
            <List
              bordered
              dataSource={results}
              renderItem={item => (
                <List.Item>
                  <div>
                    <p><strong>Soru:</strong> {item.question}</p>
                    <p><strong>Sonuç:</strong> {item.result}</p>
                    <p><strong>Puan:</strong> {item.score}</p>
                  </div>
                </List.Item>
              )}
            />
            <h3>Toplam Puan: {totalScore}</h3>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default StudentDashboard;
