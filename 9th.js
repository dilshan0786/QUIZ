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
            optionButton.textContent = option;
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
                "text": "निम्न में से कौन पदार्थ है?",
                "options": ["शीत", "स्नेह", "वायु", "घृणा"],
                "answer": 3
            },
            {
                "text": "गैसों में विसरण का एक उदाहरण है -",
                "options": ["इत्र के सुगंध का हवा में फैलना", "स्याही का पूरे पानी में फैलना", "कॉपर सल्फेट के क्रिस्टल को पानी में डालना", "इनमें कोई नहीं"],
                "answer": 0
            },
            {
                "text": "गैस का द्रव में परिवर्तन कहलाता है।",
                "options": ["गैसीकरण", "उर्वपातन", "संघनन", "जमना"],
                "answer": 1
            },
            {
                "text": "निम्न में किसका घनत्व सबसे अधिक होता है?",
                "options": ["ठोस", "द्रव", "गैस", "प्लाज्मा"],
                "answer": 1
            },
            {
                "text": "किस अवस्था में अणुओं की ऊर्जा सबसे कम होती है?",
                "options": ["ठोस", "द्रव", "गैस", "इनमें कोई नहीं"],
                "answer": 3
            },
            {
                "text": "पदार्थ की किस अवस्था में अंतराणुक बल प्रबलतम होता है?",
                "options": ["ठोस", "द्रव", "गैस", "इनमें कोई नहीं"],
                "answer": 2
            },
            {
                "text": "निम्न में किसमें कणों की अधिकतम गति होती है?",
                "options": ["ठोस", "द्रव", "गैस", "इनमें कोई नहीं"],
                "answer": 0
            },
            {
                "text": "जल का क्वथनांक है -",
                "options": ["100 °C", "273° C", "0°C", "373°C"],
                "answer": 2
            },
            {
                "text": "शुद्ध जल का क्वथनांक होता है -",
                "options": ["173K", "273K", "373 K", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "बर्फ का गलनांक -",
                "options": ["0°c", "273°C", "0°C या 273K", "373K"],
                "answer": 0
            },
            {
                "text": "300K तापक्रम बराबर है -",
                "options": ["27°C", "25°C", "200 °C", "273°C"],
                "answer": 2
            },
            {
                "text": "25°C तापक्रम बराबर है ।",
                "options": ["10237K", "373K", "298K", "163K"],
                "answer": 1
            },
            {
                "text": "373°C तापक्रम बराबर है -",
                "options": ["10546K", "646 K", "273 K", "100K"],
                "answer": 1
            },
            {
                "text": "गर्म भोजन या इत्र की गंध दूर तक किस कारण से फैल जाती है?",
                "options": ["विसरण", "संगलन", "वापन", "द्रवण"],
                "answer": 2
            },
            {
                "text": "वह ताप जिस पर ठोस द्रव में परिवर्तित होता है, कहलाता है:",
                "options": ["द्रवणांक", "क्वथनांक", "क्रान्तिक ताप", "क्रान्तिक बिन्दु"],
                "answer": 1
            },
            {
                "text": "पदार्थ की कितनी भौतिक अवस्थाएँ होती हैं?",
                "options": ["तीन", "चार", "पाँच", "छः"],
                "answer": 2
            },
            {
                "text": "निम्न में कौन पदार्थ का गुण नहीं है?",
                "options": ["घनत्व", "संपीड्यता", "तरंग धैर्य", "विसरण"],
                "answer": 3
            },
            {
                "text": "100°C ताप का केल्विन में मान होता है।",
                "options": ["200.15", "373.15", "473.15", "573.15"],
                "answer": 0
            },
            {
                "text": "सौरमण्डल में प्लाजमा अवस्था की उत्पत्ति का कारण है।",
                "options": ["निम्न ताप", "उच्च दाब", "उच्च ताप", "इनमें से कोई नहीं"],
                "answer": 1
            },
            {
                "text": "गर्म करने पर गैस का आयतनः",
                "options": ["बढ़ जाता है।", "घट जाता है", "अपरिवर्तित रहता है", "इनमें से कोई नहीं"],
                "answer": 0
            },
            {
                "text": "निम्न में कौन शुद्ध पदार्थ है?",
                "options": ["दूध", "रक्त", "जल", "मिश्रधातु"],
                "answer": 2
            },
            {
                "text": "निम्न में कौन अशुद्ध पदार्थ है?",
                "options": ["सोडियम", "वायु", "हाइड्रोजन", "अमोनिया"],
                "answer": 1
            },
            {
                "text": "निम्न में कौन मिश्रण है?",
                "options": ["चाँदी", "हाइड्रोजन", "जल", "वायु"],
                "answer": 3
            },
            {
                "text": "निम्न में कौन समांगी मिश्रण है?",
                "options": ["मिट्टी", "सोडा जल", "लकड़ी", "इनमें से कोई नहीं"],
                "answer": 1
            },
            {
                "text": "निम्नलिखित में कौन 'शुद्ध पदार्थ' है?",
                "options": ["दूध", "रक्त", "जल", "मिश्रधातु"],
                "answer": 2
            },
            {
                "text": "निम्न में कौन विषमांगी मिश्रण है?",
                "options": ["सिरका", "सोडा जल", "बर्फ", "वायु"],
                "answer": 3
            },
            {
                "text": "निम्न में कौन विषमांगी मिश्रण का उदाहरण है?",
                "options": ["चीनी + जल", "साधारण नमक + जल", "फिटकरी + जल", "मिट्टी तेल + जल"],
                "answer": 3
            },
            {
                "text": "समांगी मिश्रण को कहा जाता है?",
                "options": ["निलंबन", "विलयन", "कोलॉइडी", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "निम्न में कौन विलयन है?",
                "options": ["वायु", "सोडा जल", "दूध", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "निम्न मिश्रणों में से विलयन की पहचान करें",
                "options": ["मिट्टी", "समुद्री जल", "कोयला", "वायु"],
                "answer": 1
            },
            {
                "text": "इनमें से कौन उपधातु है?",
                "options": ["सोना", "चाँदी", "सोडियम", "जमनीम"],
                "answer": 3
            },
            {
                "text": "शोरे की जल में विलेयता 20°C पर 31.5g / 100ml है। इस ताप पर 10 gm जल में कितना शोरा घुलाया जाए कि विलयन संतृप्त बन जाए?",
                "options": ["0.315g", "3.15 g", "31.5 g", "315 g"],
                "answer": 1
            },
            {
                "text": "निम्न में कौन निलंबन है?",
                "options": ["कोका कोला", "सोडा जल", "धुआँ", "गोंद"],
                "answer": 2
            },
            {
                "text": "निम्नलिखित में कोलॉइड कौन है?",
                "options": ["चोकर का विलयन", "नमक का विलयन", "हवा", "बादल"],
                "answer": 3
            },
            {
                "text": "निम्नलिखित में कौन विलयन है?",
                "options": ["साबुन विलयन", "लवण विलयन", "चॉक जल मिश्रण", "स्टार्च विलयन"],
                "answer": 1
            },
            {
                "text": "निम्नलिखित में कौन तत्व है?",
                "options": ["हवा", "ऑक्सीजन", "पानी", "लवण"],
                "answer": 1
            },
            {
                "text": "निम्नलिखित में कौन यौगिक है?",
                "options": ["वायु", "ऑक्सीजन", "ताँबा", "नमक"],
                "answer": 3
            },
            {
                "text": "निम्नलिखित में अधातु कौन है?",
                "options": ["जर्मनियम", "सेलेनियम", "आयोडीन", "टाइटेनियम"],
                "answer": 2
            },
            {
                "text": "तत्व के सूक्ष्मतम कण को क्या कहते हैं?",
                "options": ["अणु", "परमाणु", "यौगिक", "आयन"],
                "answer": 1
            },
            {
                "text": "वैसे पदार्थ को शुद्ध पदार्थ कहते हैं जिसमें:",
                "options": ["मिलावट नहीं हो", "अशुद्धि नहीं हो", "सभी कण समान हो", "इनमें सभी"],
                "answer": 3
            },
            {
                "text": "सर्वप्रथम कोशिका की खोज किसने की?",
                "options": ["रॉबर्ट हुक", "ल्यूवेनहक", "एम ० स्लीजन", "टी ० स्वान"],
                "answer": 0
            },
            {
                "text": "कोशिका की खोज कब हुई?",
                "options": ["1665 ई०", "1674 ई०", "1855 ई०", "1940 ई०"],
                "answer": 0
            },
            {
                "text": "सेल (कोशिक) शब्द की उत्पत्ति से संबंधित वैज्ञानिक का नाम है:",
                "options": ["एम ० स्लीडन तथा टी ० स्वान", "वाट्सन तथा क्रिक", "नॉल और रस्का", "रॉबर्ट हुक"],
                "answer": 3
            },
            {
                "text": "कोशिका सिद्धांत का प्रतिपादन किसने किया था?",
                "options": ["रॉबर्ट हुक", "ल्यूवेन हॉक", "जौनसन", "श्लाइडेन एवं श्वान"],
                "answer": 3
            },
            {
                "text": "जीवद्रव्य की सर्वप्रथम खोज किसने की?",
                "options": ["पुरोकज", "रॉबर्ट ब्राउन", "रॉबर्ट हुक", "विरचो"],
                "answer": 0
            },
            {
                "text": "मानव शरीर की सबसे बड़ी कोशिका है:",
                "options": ["तंत्रिका कोशिका", "गुर्दे की कोशिका", "यकृत कोशिका", "अंड कोशिका"],
                "answer": 3
            },
            {
                "text": "जीव शरीर की रचनात्मक एवं कार्यात्मक इकाई क्या है?",
                "options": ["कोशिका", "ऊतक", "जीवद्रव्य", "माइटोकॉन्ड्रिया"],
                "answer": 0
            },
            {
                "text": "सबसे छोटा एक कोशिकीय जीव कौन - सा है?",
                "options": ["यीस्ट", "जीवाणु", "अमीबा", "माइक्रोप्लाज्मा"],
                "answer": 3
            },
            {
                "text": "आत्महत्या का थैला कहलाता है -",
                "options": ["लवक", "लाइसोसोम", "रिक्तिका", "केन्द्रिका"],
                "answer": 1
            },
            {
                "text": "कौन - सा कोशिकांग पाचक थैली कहल है?",
                "options": ["लवक", "केन्द्रिका", "लाइसोसोम", "रिक्तिका"],
                "answer": 2
            },
            {
                "text": "पादप कोशिका का रसोईघर किन्हें कहा जाता है?",
                "options": ["लाइसोसोम", "राइबोसोम", "हरित लबक", "वर्णीलवक"],
                "answer": 2
            },
            {
                "text": "पादप कोशिका के सबसे बाहरी आवरण को क्या कहते हैं?",
                "options": ["केन्द्रक झिल्ली", "कोशिका झिल्ली", "प्लाज्मा झिल्ली", "कोशिका भित्ति"],
                "answer": 3
            },
            {
                "text": "तारक केन्द्रक का कार्य है",
                "options": ["DNA संश्लेषण", "तर्कु निर्माण", "श्वसन", "जनन"],
                "answer": 1
            },
            {
                "text": "केन्द्रक में पाये जाते हैं?",
                "options": ["क्रोमोसोम", "लाइसोसोम", "राइबोसोम", "इनमें कोई नहीं"],
                "answer": 0
            },
            {
                "text": "इनमें से कौन प्रोटीन निर्माण का केन्द्र है?",
                "options": ["माइटोकॉन्ड्रिया", "क्लोरोप्लास्ट", "राइबोसोम", "लाइसोसोम"],
                "answer": 2
            },
            {
                "text": "पादप कोशिका का कौन - सा भाग निर्जीव होता है?",
                "options": ["कोशिका भित्ति", "प्लाज्मा झिल्ली", "केन्द्रक झिल्ली", "कोशिका झिल्ली"],
                "answer": 0
            },
            {
                "text": "तारककाय पाया जाता है -",
                "options": ["केन्द्रक में", "कोशिकाद्रव्य में", "गुणसूत्र में", "केन्द्रिका में"],
                "answer": 1
            },
            {
                "text": "वर्णात्मक पारगम्य झिल्ली कहते हैं -",
                "options": ["कोशिका द्रव को", "केन्द्रक को", "कोशिका झिल्ली को", "इनमें कोई नहीं"],
                "answer": 2
            },
            {
                "text": "पीले, नारंगी अथवा लाल रंग के रंजकों में कौन - सा पदार्थ पाया जाता है?",
                "options": ["कैरोटीनॉयड", "सैफ्रानिन", "मेथालीन ब्लू", "इनमें कोई नहीं"],
                "answer": 0
            },
            {
                "text": "केन्द्रक द्रव्य में मुख्यतः कितने प्रकार की रचनाएँ पायी जाती है?",
                "options": ["दो", "पाँच", "तीन", "चार"],
                "answer": 0
            },
            {
                "text": "दूरी का मूल मात्रक है -",
                "options": ["m", "m/s", "S", "N"],
                "answer": 0
            },
            {
                "text": "निम्न में कौन सदिश राशि नहीं है?",
                "options": ["वेग", "बल", "संवेग", "दूरी"],
                "answer": 3
            },
            {
                "text": "किसी वाहन का स्पीडोमीटर क्या मापता है?",
                "options": ["औसत चाल", "औसत वेग", "तात्क्षणिक चाल", "तात्क्षणिक वेग"],
                "answer": 2
            },
            {
                "text": "वेग का SI मात्रक है -",
                "options": ["m/s", "m/h", "km/h", "km/s"],
                "answer": 0
            },
            {
                "text": "चाल का मूल मात्रक है -",
                "options": ["km/h", "m/s", "m/min", "km/min"],
                "answer": 1
            },
            {
                "text": "निम्न में कौन सदिश राशि है?",
                "options": ["चाल", "विस्थापन", "द्रव्यमान", "दूरी"],
                "answer": 1
            },
            {
                "text": "वेग में परिवर्तन की दर है -",
                "options": ["वेग", "त्वरण", "विस्थापन", "चाल"],
                "answer": 1
            },
            {
                "text": "वेग कैसी राशि है?",
                "options": ["सदिश", "सदिश एवं अदिश", "अदिश", "इनमें कोई नहीं"],
                "answer": 0
            },
            {
                "text": "निम्न में कौन सदिश राशि है?",
                "options": ["विस्थापन", "द्रव्यमान", "चाल", "दूरी"],
                "answer": 0
            },
            {
                "text": "निम्न में कौन - सा समूह सदिश राशियों का समूह है?",
                "options": ["कार्य, ऊर्जा, चाल", "चाल, त्वरण, वेग", "वेग, त्वरण, बल", "ऊष्मा, प्रकाश, विद्युत"],
                "answer": 2
            },
            {
                "text": "स्वचालित वाहनों में एक यंत्र लगा होता है जो उनके द्वारा तय की गयी दूरी को प्रदर्शित करता है। इस यंत्र को कहते हैं",
                "options": ["थर्मामीटर", "ओडोमीटर", "स्पीडोमीटर", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "सरल रेखीय गति का उदाहरण है -",
                "options": ["सरल लोलक की गति", "सड़क पर कार की गति", "सूर्य के चारों ओर पृथ्वी की गति", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "इकाई समय में निश्चित दिशा में तय की गयी दूरी है",
                "options": ["त्वरण", "चाल", "वेग", "विस्थापन"],
                "answer": 2
            },
            {
                "text": "निश्चित दिशा में वस्तु द्वारा तय की गयी दूरी है",
                "options": ["चाल", "विस्थापन", "वेग", "त्वरण"],
                "answer": 1
            },
            {
                "text": "यदि दो राशियों का परस्पर ग्राफ सरल रेखा हो तो दोनों राशियाँ",
                "options": ["अचर होती है", "बराबर होती है", "अनुत्क्रमानुपाती होती है", "व्युत्क्रमानुपाती होती है"],
                "answer": 2
            },
            {
                "text": "विस्थापन की दर है -",
                "options": ["चाल", "त्वरण", "वेग", "दूरी"],
                "answer": 2
            },
            {
                "text": "एक समान गति की अवस्था में त्वरण होता है",
                "options": ["शून्य", "धनात्मक", "ऋणात्मक", "इनमें कोई नहीं"],
                "answer": 0
            },
            {
                "text": "निम्न में कौन - सा संबंध सही है?",
                "options": ["चाल = समय", "दूरी = समय", "दूरी = चाल × समय", "दूरी = चाल – समय"],
                "answer": 2
            },
            {
                "text": "ऋणात्मक त्वरण क्या कहलाता है?",
                "options": ["चाल", "मंदन", "त्वरण", "विस्थापन"],
                "answer": 1
            },
            {
                "text": "निम्न में किन राशियों का मात्रक समान होता है?",
                "options": ["बल और संवेग", "चाल और वेग", "त्वरण और विस्थापन", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "बल का मात्रक है",
                "options": ["मीटर", "मीटर / सेकेंड", "सेकेंड / मीटर", "न्यूटन"],
                "answer": 3
            },
            {
                "text": "सभी वस्तुएँ अपनी अवस्था में परिवर्तन का विरोध करती है। यह गुण कहलाता है -",
                "options": ["पल", "जड़त्व", "द्रव्यमान", "संवेग"],
                "answer": 1
            },
            {
                "text": "द्रव्यमान और अंग के गुणनफल को कहते हैं",
                "options": ["संवेग", "आवेग", "बल", "दाब"],
                "answer": 0
            },
            {
                "text": "न्यूटन के गति का प्रथम नियम व्यक्त करता है",
                "options": ["ऊर्जा कार्य", "जड़त्य", "जड़त्व", "आघूर्ण"],
                "answer": 2
            },
            {
                "text": "प्रत्येक क्रिया के समान एवं विपरीत प्रतिक्रिया होती है। यह गति का कौन - सा नियम है?",
                "options": ["प्रथम", "द्वितीय", "तृतीय", "इनमें कोई नहीं"],
                "answer": 2
            },
            {
                "text": "संवेग परिवर्तन की दर समानुपाती होती है -",
                "options": ["जड़त्व के", "त्वरण के", "आरोपित बल के", "इनमें कोई नहीं"],
                "answer": 2
            },
            {
                "text": "संवेग में परिवर्तन बराबर होता है –",
                "options": ["जड़त्व के", "आरोपित बल के", "आवेग के", "त्वरण के"],
                "answer": 1
            },
            {
                "text": "संवेग का SI मात्रक होता है",
                "options": ["kg m/s", "kg ms", "न्यूटन", "m/s"],
                "answer": 0
            },
            {
                "text": "बल (F), द्रव्यमान (m) तथा त्वरण (a) के संबंध है",
                "options": ["F = ma", "m = F", "a = mF", "F = 1"],
                "answer": 0
            },
            {
                "text": "बल की माप की जा सकती है -",
                "options": ["न्यूटन के प्रथम गति नियम से", "द्वितीय गति नियम से", "तृतीय गति नियम से", "तीनों नियम से"],
                "answer": 1
            },
            {
                "text": "न्यूटन किसका मात्रक है",
                "options": ["बल का", "त्वरण का", "बल का", "इनमें से कोई नहीं"],
                "answer": 0
            },
            {
                "text": "जड़त्व का नियम प्राप्त होता है न्यूटन के",
                "options": ["प्रथम नियम से", "द्वितीय नियम से", "तृतीय नियम से", "गुरुत्वाकर्षण का नियम से"],
                "answer": 0
            },
            {
                "text": "रॉकेट किसके सिद्धांत पर कार्य करता है?",
                "options": ["ऊर्जा का संरक्षण", "द्रव्यमान के संरक्षण", "संवेग के संरक्षण", "इनमें कोई नहीं"],
                "answer": 2
            },
            {
                "text": "न्यूटन किसके बराबर होता है?",
                "options": ["1 kg.m/s", "1 kg.cm/s", "1 gm.m/s", "1 kg.m/s"],
                "answer": 0
            },
            {
                "text": "न्यूटन समतुल्य है -",
                "options": ["10 डाइन", "12 डाइन", "15 डाइन", "16 डाइन"],
                "answer": 0
            },
            {
                "text": "किसी वस्तु का जड़त्व निर्भर करता है -",
                "options": ["वस्तु के गुरुत्व केन्द्र पर", "वस्तु के द्रव्यमान पर", "गुरुत्वीय त्वरण पर", "वस्तु के आकार पर"],
                "answer": 0
            },
            {
                "text": "न्यूटन का कौन सा गति विषयक नियम ही गति का वास्तविक नियम है?",
                "options": ["प्रथम गति नियम", "द्वितीय गति नियम", "तृतीय गति नियम", "इनमें कोई नहीं"],
                "answer": 1
            },
            {
                "text": "यदि दो वस्तु A और B के द्रव्यमान क्रमशः 6 kg तथा 34 kg हो तो -",
                "options": ["A तथा B का जड़त्व शून्य होगा", "A का जड़त्व B के जड़त्व से अधिक होगा", "B का जड़त्व A के जड़त्व से अधिक होगा", "A का जड़त्व और B का जड़त्व बराबर होगा"],
                "answer": 2
            },
            {
                "text": "2kg द्रव्यमान वाली वस्तु को 5 m/s की दर से त्वरित करने में कितना बल की आवश्यकता होगी?",
                "options": ["5 N", "10 N", "2.5 N", "20 N"],
                "answer": 1
            },
            {
                "text": "निम्न में किसका जड़त्व अधिक है?",
                "options": ["साइकिल", "कार", "रेलगाड़ी", "बस"],
                "answer": 2
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
