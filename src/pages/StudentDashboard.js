import React, { useState, useEffect } from 'react';
import { Layout, List, notification, Button } from 'antd';

const { Content } = Layout;

const EXAMS_SHEETY_URL = 'https://v1.nocodeapi.com/azad47/google_sheets/BghSKzulzfPRVdhP?tabId=Sayfa3';
const QUESTIONS_SHEETY_URL = 'https://v1.nocodeapi.com/azad47/google_sheets/BghSKzulzfPRVdhP?tabId=Sayfa2';
const RESULTS_SHEETY_URL = 'https://v1.nocodeapi.com/azad47/google_sheets/BghSKzulzfPRVdhP?tabId=Sayfa4';

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch(EXAMS_SHEETY_URL);
      const result = await response.json();
      if (result.records && Array.isArray(result.records)) {
        setExams(result.records);
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
      const response = await fetch(url);
      const result = await response.json();
      if (result.records && Array.isArray(result.records)) {
        setQuestions(result.records);
        setCurrentExam(examCode);
      } else {
        throw new Error('Invalid questions data format');
      }
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Sorular yüklenemedi' });
    }
  };

  const submitResults = async (results) => {
    try {
      await fetch(RESULTS_SHEETY_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(results),
      });
      notification.success({ message: 'Sonuçlar başarıyla kaydedildi' });
    } catch (error) {
      console.error(error);
      notification.error({ message: 'Sonuçlar kaydedilemedi' });
    }
  };

  const handleSolveExam = () => {
    const results = questions.map(question => ({
      examCode: currentExam,
      question: question.fields.text,
      result: getRandomBoolean() ? 'Correct' : 'Incorrect'
    }));
    submitResults(results);
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
                  Sınavı Çöz
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
              dataSource={questions}
              renderItem={item => {
                const { text, choiceA, choiceB, choiceC, choiceD } = item.fields || {};
                if (!text) {
                  console.error('Invalid question item:', item);
                  return null;
                }
                return (
                  <List.Item>
                    {text}
                    <ul>
                      <li>A. {choiceA}</li>
                      <li>B. {choiceB}</li>
                      <li>C. {choiceC}</li>
                      <li>D. {choiceD}</li>
                    </ul>
                  </List.Item>
                );
              }}
            />
            <Button type="primary" onClick={handleSolveExam} style={{ marginTop: '20px' }}>
              Sonuçları Gönder
            </Button>
          </div>
        )}
      </Content>
    </Layout>
  );
}

export default StudentDashboard;
