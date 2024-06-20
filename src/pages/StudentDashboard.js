import React, { useState, useEffect } from 'react';
import { Layout, List, notification, Button } from 'antd';

const { Content } = Layout;

// const EXAMS_SHEETY_URL = 'https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa3';
// const QUESTIONS_SHEETY_URL = 'https://v1.nocodeapi.com/azad4721/google_sheets/NMiyRCxxVSwkcoWm?tabId=Sayfa2';

function getRandomBoolean() {
  return Math.random() >= 0.5;
}

function StudentDashboard() {
  // const [exams, setExams] = useState([]);
  // const [questions, setQuestions] = useState([]);
  // const [results, setResults] = useState([]);
  // const [currentExam, setCurrentExam] = useState(null);
  // const [totalScore, setTotalScore] = useState(0);

  // useEffect(() => {
  //   fetchExams();
  // }, []);

  // const fetchExams = async () => {
  //   try {
  //     const response = await fetch(EXAMS_SHEETY_URL);
  //     const result = await response.json();
  //     console.log('Exams:', result.data); // Debugging için sınavları yazdır

  //     if (result.data && Array.isArray(result.data)) {
  //       setExams(result.data);
  //     } else {
  //       throw new Error('Invalid exams data format');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     notification.error({ message: 'Sınavlar yüklenemedi' });
  //   }
  // };

  // const fetchQuestions = async (examCode) => {
  //   try {
  //     const url = `${QUESTIONS_SHEETY_URL}&filterByFormula=${encodeURIComponent(`examCode="${examCode}"`)}`;
  //     console.log(`Fetching questions for exam code: ${examCode}`); // Debugging için sınav kodunu yazdır
  //     const response = await fetch(url);
  //     const result = await response.json();
  //     console.log('Questions:', result.data); // Debugging için soruları yazdır

  //     // Soruları sınav koduna göre filtrele
  //     const filteredQuestions = result.data.filter(question => question.examCode === examCode);

  //     if (filteredQuestions && Array.isArray(filteredQuestions)) {
  //       setQuestions(filteredQuestions);
  //       setCurrentExam(examCode);

  //       // Öğrencinin soruları çözüp sonuçları doldurması ve puan hesaplama
  //       const generatedResults = filteredQuestions.map(question => {
  //         const isCorrect = getRandomBoolean();
  //         return {
  //           question: question.text,
  //           result: isCorrect ? 'Correct' : 'Incorrect',
  //           score: isCorrect ? parseInt(question.points, 10) : 0
  //         };
  //       });
  //       setResults(generatedResults);

  //       // Toplam puanı hesaplama
  //       const totalScore = generatedResults.reduce((sum, result) => sum + result.score, 0);
  //       setTotalScore(totalScore);
  //     } else {
  //       throw new Error('Invalid questions data format');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     notification.error({ message: 'Sorular yüklenemedi' });
  //   }
  // };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <h1 className='h1'>Öğrenci Profili</h1>
        <List
          bordered
          // dataSource={exams}
          renderItem={item => {
            const code = item.code;
            if (!code) {
              console.error('Invalid exam item:', item);
              return null;
            }
            return (
              <List.Item>
                Sınav Kodu: {code}
                <Button /*onClick={() => fetchQuestions(code)}*/ style={{ marginLeft: '10px' }}>
                  Sınavı Görüntüle
                </Button>
              </List.Item>
            );
          }}
        />
        {/*currentExam && questions.length > 0 && (
          <div>
            <h2>Sınav: {currentExam}</h2>
            <List
              bordered
              // dataSource={results}
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
        {currentExam && questions.length === 0 && (
          <div>
            <h2>Sınav: {currentExam}</h2>
            <p>Bu sınav için henüz soru eklenmemiş.</p>
          </div>
        )*/}
      </Content>
    </Layout>
  );
}

export default StudentDashboard;
