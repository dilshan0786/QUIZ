document.addEventListener('DOMContentLoaded', () => {
    const quizQuestions = generateQuizQuestions();
    let currentQuestionIndex = 0;
    let timer;
    let startTime;
    let selectedOptions = [];
    let questionStartTimes = [];
    let questionEndTimes = [];
    let totalTime = 0;

    document.getElementById('start-quiz').addEventListener('click', startQuiz);
    document.getElementById('skip-question').addEventListener('click', skipQuestion);

    function startQuiz() {
        document.getElementById('form-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex >= 15) { // Assuming you want 15 random questions
            showResults();
            return;
        }

        const question = quizQuestions[currentQuestionIndex];
        const questionContainer = document.getElementById('question-container');
        const optionsContainer = document.getElementById('options-container');

        questionContainer.innerHTML = `<h4>Q${currentQuestionIndex + 1}: ${question.text}</h4>`;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionButton = document.createElement('button');
            optionButton.innerHTML = option;
            optionButton.className = 'option-button';
            optionButton.onclick = () => selectOption(index, optionButton);
            optionsContainer.appendChild(optionButton);
        });

        startTime = Date.now();
        questionStartTimes[currentQuestionIndex] = startTime;
        startTimer();
    }

    function startTimer() {
        let timeRemaining = 30;
        document.getElementById('time').textContent = timeRemaining;

        clearInterval(timer);
        timer = setInterval(() => {
            timeRemaining--;
            document.getElementById('time').textContent = timeRemaining;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                skipQuestion();
            }
        }, 1000);
    }

    function selectOption(selectedIndex, button) {
        const buttons = document.querySelectorAll('#options-container .option-button');
        buttons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');

        selectedOptions[currentQuestionIndex] = selectedIndex;
        clearInterval(timer);

        setTimeout(() => {
            const endTime = Date.now();
            questionEndTimes[currentQuestionIndex] = endTime;
            totalTime += (endTime - questionStartTimes[currentQuestionIndex]) / 1000;
            currentQuestionIndex++;
            showQuestion();
        }, 500);
    }

    function skipQuestion() {
        if (currentQuestionIndex < 15) {
            selectedOptions[currentQuestionIndex] = -1; // Mark as skipped
            const endTime = Date.now();
            questionEndTimes[currentQuestionIndex] = endTime;
            totalTime += (endTime - questionStartTimes[currentQuestionIndex]) / 1000;
            currentQuestionIndex++;
            showQuestion();
        }
    }

    function showResults() {
        document.getElementById('quiz-section').style.display = 'none';
        document.getElementById('result-section').style.display = 'block';

        const resultSummary = document.getElementById('result-summary');
        let correctAnswers = 0;

        quizQuestions.forEach((question, index) => {
            if (selectedOptions[index] !== undefined) {
                if (selectedOptions[index] === question.answer) {
                    correctAnswers++;
                }
            }
        });

        resultSummary.innerHTML = `
            <p>Total Time: ${totalTime.toFixed(2)} seconds</p>
            <p>Correct Answers: ${correctAnswers}</p>
            <p>Incorrect Answers: ${15 - correctAnswers}</p>
        `;
    }

    function generateQuizQuestions() {
        const questions = [
            {
                "text": "आवेश की विमा होता हैं?",
                "options": ["LT", "[AT]", "MLT", "MT"],
                "answer": 1
            },
            {
                "text": "जब किसी वस्तु को आवेशित किया जाता हैं तो उसका द्रव्यमान ?",
                "options": ["घट जाता हैं", "बढ़ जाता हैं", "बढ़ या घट जाता हैं", "नहीं बदलता"],
                "answer": 2
            },
            {
                "text": "एक कूलॉम आवेश = ........... e.s.u",
                "options": ["3 × 10<sup>3</sup>", "3 × 10<sup>6</sup>", "3 × 10<sup>9</sup>", "3 × 10<sup>12</sup>"],
                "answer": 2
            },
            {
                "text": "e<sup>0</sup> पर आवेश होता हैं?",
                "options": ["1.6 × 10<sup>-19</sup>C", "1.6 × 10<sup>19</sup>C", "0", "1"],
                "answer": 0
            },
            {
                "text": "E<sub>0</sub> का मात्रक होता हैं?",
                "options": ["m", "kg", "C", "fm<sup>-1</sup>"],
                "answer": 3
            },
            {
                "text": "पारावैधुतांक का S.I मात्रक होता हैं?",
                "options": ["C<sup>2</sup>N<sup>-1</sup>m<sup>-2</sup>", "N / C", "V / m", "m<sup>-1</sup>"],
                "answer": 0
            },
            {
                "text": "हवा में E<sub>r</sub> का मान हैं?",
                "options": ["0", "2", "1", "1.1"],
                "answer": 2
            },
            {
                "text": "पानी का परावैधुत स्थिरांक होता हैं?",
                "options": ["70", "80", "60", "100"],
                "answer": 1
            },
            {
                "text": "विधुत क्षेत्र में एक आवेशित कण पर लगने वाला बल का मान होता हैं?",
                "options": ["qE", "qE<sup>2</sup>", "E / q", "E"],
                "answer": 0
            },
            {
                "text": "विधुत द्विध्रुव आघूर्ण का S.I मात्रक?",
                "options": ["C<sup>2</sup>m<sup>2</sup>J<sup>-1</sup>", "N / C", "J / C", "NC<sup>-1</sup>"],
                "answer": 3
            },
            {
                "text": "किसी माध्यम की निरपेक्ष परावैधुतता तथा ϵ<sub>r</sub> बराबर होती हैं?",
                "options": ["E / E0", "E0 / E", "E", "E0"],
                "answer": 0
            },
            {
                "text": "विधुत फलक्स का S.I मात्रक हैं?",
                "options": ["वोल्ट / मीटर", "वोल्ट मीटर", "कूलॉम", "न्यूटन"],
                "answer": 1
            },
            {
                "text": "विधुत क्षेत्र की तीव्रता का मात्रक होता हैं?",
                "options": ["वोल्ट / मीटर", "कूलॉम / मीटर", "न्यूटन / कूलॉम", "न्यूटन / मीटर"],
                "answer": 2
            },
            {
                "text": "दो विधुत क्षेत्र रेखाएँ एक दूसरो को किस कोण पर काटती हैं?",
                "options": ["किसी कोण पर नहीं काटती हैं", "90<sup>0</sup>", "45<sup>0</sup>", "180<sup>0</sup>"],
                "answer": 0
            },
            {
                "text": "डिबाई मात्रक हैं?",
                "options": ["विधुत क्षेत्र", "परावैधुतांक", "आवेश", "विधुत द्विधूर्व आघूर्ण का"],
                "answer": 3
            },
            {
                "text": "एक आवेशित चालक की सतह के किस बिंदू पर विधुतीय क्षेत्र की तीव्रता?",
                "options": ["सतह की समानांतर हैं", "सतह की लंबवत हैं", "केंद्र पर", "कोणीय बिंदू पर"],
                "answer": 1
            },
            {
                "text": "एक वैधुत द्विध्रुव पर वैधुत शून्य नही होता हैं जब वैधुत क्षेत्र हो?",
                "options": ["समान", "स्थिर", "असमान", "नियमित"],
                "answer": 2
            },
            {
                "text": "किसी उदासीन वस्तु को ऋणावेशित करने पर उसका द्रव्यमाण ?",
                "options": ["घट जाता है।", "बढ़ जाता है।", "घट तथा बढ़ जाता है।", "इनमें से कोई नहीं।"],
                "answer": 1
            },
            {
                "text": "आवेश का पृष्ठीय घनत्व बराबर होता हैं?",
                "options": ["कुल द्रव्यमाण / कुल क्षेत्रफल", "आवेश / वोल्ट", "क्षेत्रफल / आवेश", "कुल आवेश / कुल क्षेत्रफल"],
                "answer": 3
            },
            {
                "text": "किस राशि का मात्रक वोल्ट / मीटर होता हैं?",
                "options": ["विधुतीय क्षेत्र", "पारावैधुतांक", "विधुत फलक्स", "धनात्मक आवेश"],
                "answer": 0
            },

            {
                "text": "समरुप वेग से चलायमान आवेश उत्पन्न करता हैं ?",
                "options": ["विधुत क्षेत्र", "विधुत चुंबकीय क्षेत्र", "विधुत द्विध्रुव आघूर्ण", "विधुत फलक्स"],
                "answer": 1
            },
            {
                "text": "चुंबकीय द्विध्रुव आघूर्ण एक सदिश राशि हैं जो निर्दिष्ट होते हैं?",
                "options": ["पूर्व से पश्चिम", "उत्तर से दक्षिण", "उपरोक्त में से कोई नहीं", "दक्षिण से उत्तर"],
                "answer": 3
            },
            {
                "text": "एक प्रबल विधुत चुंबक बनाने के लिए कौन सी वस्तु बहुत अधिक उपयुक्त होगी?",
                "options": ["नरम लोहा", "गोल्ड", "स्टील", "कॉपर"],
                "answer": 0
            },
            {
                "text": "निर्वात या हवा की चुम्बकशीलता π<sub>0</sub> का मान होता हैं?",
                "options": ["1π × 10<sup>-6</sup> हेनरी / मीटर", "4π × 10<sup>-7</sup> हेनरी / मीटर", "5π × 10<sup>-7</sup> हेनरी / मीटर", "2π × 10<sup>-7</sup> हेनरी / मीटर"],
                "answer": 1
            },
            {
                "text": "चुम्बकीय क्षेत्र का विमा?",
                "options": ["ML<sup>0</sup>T<sup>2</sup>A<sup>-1</sup>", "MLT<sup>2</sup>A<sup>-1</sup>", "M<sup>2</sup>L<sup>-1</sup>T<sup>2</sup>A<sup>-1</sup>", "M<sup>2</sup>L<sup>-1</sup>T<sup>-2</sup>A<sup>-1</sup>"],
                "answer": 0
            },
            {
                "text": "चुंबकीय द्विध्रुव का मात्रक?",
                "options": ["एम्पियर मीटर<sup>2</sup>", "कूलॉम मीटर", "न्यूटन मीटर", "वोल्ट मीटर"],
                "answer": 0
            },
            {
                "text": "चुंबकीय द्विध्रुव आघूर्ण का मात्रक?",
                "options": ["A·m", "T·m", "N·m", "C·m"],
                "answer": 0
            },
            {
                "text": "पृथ्वी के चुंबकीय क्षेत्र का क्षैतिज घटक क्या हैं?",
                "options": ["B<sub>H</sub> = B sin θ", "B<sub>v</sub> = B sin θ", "B<sub>H</sub> = B cos θ", "B<sub>v</sub> = B cos θ"],
                "answer": 0
            },
            {
                "text": "पृथ्वी के चुंबकीय क्षेत्र का उर्ध्वा घटक क्या हैं?",
                "options": ["B<sub>H</sub> = B cos θ", "B<sub>v</sub> = B sin θ", "B<sub>H</sub> = B sin θ", "B<sub>v</sub> = B cos θ"],
                "answer": 1
            },
            {
                "text": "पृथ्वी की विषुवत रेखा पर निबंध लटकी चुम्बकीय सुई?",
                "options": ["उर्ध्वा रहती हैं", "क्षैतिज रहती हैं", "दक्षिण रहती हैं", "इनमें से कोई नहीं।"],
                "answer": 1
            },
            {
                "text": "विधुत चुंबक बनाने के लिए पदार्थ में होनी चाहिए?",
                "options": ["उच्च तापमान और कम प्रतिरोध", "उच्च चुम्बकीय प्रवृत्ति", "कम प्रतिरोध", "उच्च तापमान"],
                "answer": 1
            },
            {
                "text": "प्रतिचुंबकीय पदार्थ के दो उदाहरण?",
                "options": ["O<sub>2</sub>, N<sub>2</sub>", "Cu, Ag", "Fe, Co", "Al, Na"],
                "answer": 0
            },
            {
                "text": "अनुचुंबकीय पदार्थ के दो उदाहरण?",
                "options": ["Fe, Co", "Cu, Ag", "O<sub>2</sub>, N<sub>2</sub>", "Al, Na"],
                "answer": 3
            },
            {
                "text": "लौह चुंबकीय पदार्थ के दो उदाहरण?",
                "options": ["Fe, Co", "O<sub>2</sub>, N<sub>2</sub>", "निकिल और कोबाल्ट", "Al, Na"],
                "answer": 2
            },
            {
                "text": "चुंबकीय क्षेत्र की तीव्रता का मात्रक?",
                "options": ["Tesla", "Gauss", "Henry", "Ampere"],
                "answer": 0
            },
            {
                "text": "चुंबकीय क्षेत्र का C.G.S पद्यति का मात्रक?",
                "options": ["एम्पीयर", "गॉस", "टेस्ला", "हेनरी"],
                "answer": 1
            },
            {
                "text": "चुंबकीय प्रेरण का S.I मात्रक?",
                "options": ["Tesla", "Gauss", "Henry", "Ampere"],
                "answer": 0
            },
            {
                "text": "वोल्टमीटर मापता हैं?",
                "options": ["विभवांतर", "प्रतिरोध", "धारा", "चुंबकीय क्षेत्र"],
                "answer": 0
            },
            {
                "text": "एमीटर का प्रतिरोध होता हैं?",
                "options": ["बहुत अधिक", "मध्यम", "बहुत कम", "मापनीय"],
                "answer": 2
            },
            {
                "text": "गैल्वेनोमीटर को वोल्टमीटर बनाने में जरुरत हैं?",
                "options": ["उच्च प्रतिरोध", "चुंबकीय क्षेत्र", "निम्न प्रतिरोध", "वोल्टेज"],
                "answer": 0
            },
            {
                "text": "विधुतीय विभव की वीमा हैं?",
                "options": ["MLT<sup>-1</sup>A<sup>-2</sup>", "ML<sup>2</sup>T<sup>-3</sup>A<sup>-1</sup>", "ML<sup>2</sup>T<sup>-1</sup>A<sup>-1</sup>", "ML<sup>2</sup>T<sup>-2</sup>A<sup>-1</sup>"],
                "answer": 1
            },
            {
                "text": "विधुत क्षेत्र E और विभव V के बीच संबंध होता हैं?",
                "options": ["E = -V/dn", "E = dV/dn", "E = V/dn", "E = -dv/dn"],
                "answer": 3
            },
            {
                "text": "इलेक्ट्रोन-वोल्ट किसके द्वारा मापा जाता हैं?",
                "options": ["ऊर्जा", "धारा", "विभवांतर", "प्रतिरोध"],
                "answer": 0
            },
            {
                "text": "किसी चालक का विशिष्ट प्रतिरोध बढ़ता हैं?",
                "options": ["धारा बढ़ने से", "तापमान बढ़ने से", "तापमान घटने से", "विभवांतर बढ़ने से"],
                "answer": 1
            },
            {
                "text": "एक विधुतीय परिपथ में विभांतर मापा जाता हैं?",
                "options": ["एम्पियर", "वोल्ट", "ओम", "वाट"],
                "answer": 1
            },
            {
                "text": "प्रतिरोध का S.I मात्रक हैं?",
                "options": ["वाट", "ओम", "वोल्ट", "एम्पियर"],
                "answer": 1
            },
            {
                "text": "प्रतिरोध का वीमा हैं?",
                "options": ["ML<sup>2</sup>T<sup>-3</sup>A<sup>-2</sup>", "MLT<sup>2</sup>A<sup>-1</sup>", "ML<sup>2</sup>T<sup>-3</sup>A<sup>-1</sup>", "ML<sup>2</sup>T<sup>-2</sup>A<sup>-2</sup>"],
                "answer": 0
            },
            {
                "text": "विशिष्ट प्रतिरोध या प्रतिरोधकता का वीमा हैं?",
                "options": ["ML<sup>2</sup>T<sup>-2</sup>A<sup>-1</sup>", "ML<sup>2</sup>T<sup>-1</sup>A<sup>-2</sup>", "ML<sup>3</sup>T<sup>-3</sup>A<sup>-1</sup>", "ML<sup>3</sup>T<sup>-3</sup>A<sup>-2</sup>"],
                "answer": 3
            },
            {
                "text": "विशिष्ट प्रतिरोध या प्रतिरोधकता का S.I मात्रक हैं?",
                "options": ["ओम·मीटर", "वोल्ट·सेकंड", "ओम·सेंटीमीटर", "कूलॉम/मीटर"],
                "answer": 0
            },
            {
                "text": "1 kwh किसके बराबर होता हैं?",
                "options": ["1 × 10<sup>6</sup> j", "3.6 × 10<sup>6</sup> j", "1 × 10<sup>6</sup> j", "3.6 × 10<sup>9</sup> j"],
                "answer": 1
            },
            {
                "text": "स्वस्थ मनुष्य शरीर का विधुत प्रतिरोध हैं?",
                "options": ["100 ओम", "10000 ओम", "1000 ओम", "100000 ओम"],
                "answer": 1
            },
            {
                "text": "विधुत परिपथ की शक्ति होती हैं?",
                "options": ["V/R", "I²R", "IR", "V²/R"],
                "answer": 3
            },
            {
                "text": "एम्पियर-घंटा का मात्रक हैं?",
                "options": ["विभवांतर", "शक्ति", "आवेश", "धारा"],
                "answer": 2
            },
            {
                "text": "मॉबिलिटी का S.I मात्रक हैं?",
                "options": ["A·m<sup>2</sup> / N", "A·m / N<sup>-1</sup>", "A·m<sup>-1</sup> / N", "A·m / N"],
                "answer": 3
            },
            {
                "text": "विधुत वाहक बल की वीमा हैं?",
                "options": ["ML<sup>2</sup>T<sup>-3</sup>I<sup>2</sup>", "ML<sup>2</sup>T<sup>-3</sup>I<sup>-1</sup>", "ML<sup>2</sup>T<sup>-2</sup>I<sup>-1</sup>", "ML<sup>2</sup>T<sup>-3</sup>I<sup>-1</sup>"],
                "answer": 1
            },
            {
                "text": "किलोवाट घंटा का मात्रक हैं?",
                "options": ["शक्ति", "ऊर्जा", "धारा", "विभवांतर"],
                "answer": 1
            },
            {
                "text": "एक ऐम्पियर बराबर होता हैं?",
                "options": ["1c / 1s", "1s / 1c", "1c", "1s"],
                "answer": 0
            },
            {
                "text": "पदार्थ की प्रतिरोधकता हैं?",
                "options": ["P = RA / L", "P = L / R", "P = RA", "P = L / R²"],
                "answer": 0
            },
            {
                "text": "विधुत वाहक बल की इकाई हैं?",
                "options": ["वोल्ट", "ओम", "अम्पियर", "वाट"],
                "answer": 0
            },
            {
                "text": "प्रतिरोध के समांतर क्रम में कौन-सी राशि समान हैं?",
                "options": ["धारा", "विभवांतर", "शक्ति", "प्रतिरोध"],
                "answer": 1
            },
            {
                "text": "कार्बन प्रतिरोध के हरे रंग कोड का मान हैं?",
                "options": ["6", "4", "3", "5"],
                "answer": 3
            },
            {
                "text": "कार्बन प्रतिरोध के रंग कोड में पीले रंग का मान हैं?",
                "options": ["4", "5", "2", "1"],
                "answer": 0
            },
            {
                "text": "कार्बन प्रतिरोध के कलर कोड में लाल रंग का मान होता हैं?",
                "options": ["3", "4", "5", "2"],
                "answer": 3
            },
            {
                "text": "1 वोल्ट बराबर होता हैं?",
                "options": ["1 JC<sup>-1</sup>", "1 C/J", "1 J", "1 C"],
                "answer": 0
            },
            {
                "text": "नीले रंग के कार्बन प्रतिरोध का कलर कोड होता हैं?",
                "options": ["5", "6", "4", "3"],
                "answer": 1
            },
            {
                "text": "चालक के अंदर इलेक्ट्रॉन की शक्ति होती हैं?",
                "options": ["नियमित", "अपसरित", "वृद्धि", "कम"],
                "answer": 1
            },
            {
                "text": "हीटस्टोन ब्रिज का उपयोग किया जाता हैं?",
                "options": ["प्रतिरोध मापने के लिए", "वोल्टेज मापने के लिए", "धारा मापने के लिए", "फ्रीक्वेंसी मापने के लिए"],
                "answer": 0
            },
            {
                "text": "किर्चॉफ का दूसरा नियम क्या हैं?",
                "options": ["वोल्टेज संरक्षण", "धारा संरक्षण", "ऊर्जा संरक्षण", "चुंबकीय प्रेरण"],
                "answer": 2
            },
            {
                "text": "व्हीटस्टोन सेतु क्या तुलना करता हैं?",
                "options": ["प्रतिरोधों का", "धारा का", "वोल्टेज का", "चुंबकीय बल का"],
                "answer": 0
            },
            {
                "text": "किसी तार का प्रतिरोध 5000 है। उसकी विधुत चालकता होगी?",
                "options": ["0.01 Ω", "0.002 Ω<sup>-1</sup>", "0.005 Ω", "0.001 Ω"],
                "answer": 1
            },
            {
                "text": "डायनेमो के कार्य का सिद्धांत आधारित हैं?",
                "options": ["विधुत चुंबकीय प्रेरण पर", "ऊर्जा संरक्षण पर", "धारा संरक्षण पर", "वोल्टेज पर"],
                "answer": 0
            },
            {
                "text": "एक पूरे चक्र में प्रत्यावर्ती धारा का माध्य मान होता हैं?",
                "options": ["शून्य", "1", "0.5", "2"],
                "answer": 0
            },
            {
                "text": "विधुत लेपन में व्यवहार आने वाली धारा होती हैं?",
                "options": ["DC", "AC", "फ्रीक्वेंसी", "वोल्टेज"],
                "answer": 0
            },
            {
                "text": "प्रतिबाधा का मात्रक होता हैं?",
                "options": ["Ω", "V", "A", "W"],
                "answer": 0
            },
            {
                "text": "किस रंग का तरंगदैर्ध्य सबसे कम होता हैं?",
                "options": ["बैगनी", "नीला", "हरा", "लाल"],
                "answer": 0
            },
            {
                "text": "इंद्रधनुष का निर्माण किस कारण होता हैं?",
                "options": ["परावर्तन और अपवर्तन", "परावर्तन", "विकिरण", "अपवर्तन"],
                "answer": 3
            },
            {
                "text": "(µ<sub>0</sub>E<sub>0</sub>)<sup>1/2</sup> का मान हैं?",
                "options": ["3 × 10<sup>8</sup> सेमी/सेकेण्ड", "3 × 10<sup>10</sup> सेमी/सेकेण्ड", "1 × 10<sup>10</sup> सेमी/सेकेण्ड", "1 × 10<sup>8</sup> सेमी/सेकेण्ड"],
                "answer": 1
            },
            {
                "text": "प्रेरण कुंडली क्या उत्पन्न करती हैं?",
                "options": ["चुंबकीय क्षेत्र", "उच्च धारा", "उच्च वोल्टेज", "ऊर्जा"],
                "answer": 2
            },
            {
                "text": "किरचॉफ का द्वितीय नियम क्या हैं?",
                "options": ["वोल्टेज संरक्षण नियम", "धारा संरक्षण नियम", "ऊर्जा संरक्षण नियम", "चुंबकीय प्रेरण"],
                "answer": 2
            },
            {
                "text": "विभवमापी से मुख्यतः क्या मापा जाता हैं?",
                "options": ["विभवांतर", "धारा", "प्रतिरोध", "चुंबकीय क्षेत्र"],
                "answer": 0
            }

            // Add more questions here
        ];

        return shuffle(questions).slice(0, 15);
    }

    function shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
});
