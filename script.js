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
                text: "श्वसन किस प्रकार की अभिक्रिया है?",
                options: ["ऊष्माक्षेपी", "संयोजन", "अपचयन", "ऊष्माशोषी"],
                answer: 0
            },
            {
                text: "फेरस सल्फेट क्रिस्टल का रंग होता है?",
                options: ["श्वेत", "भूरा", "लाल", "हरा"],
                answer: 3
            },
            {
                text: "शाक-सब्जियों को विघटित होकर कम्पोस्ट बनना किस अभिक्रिया का उदाहरण है?",
                options: ["ऊष्माशोषी", "ऊष्माक्षेपी", "उभयगामी", "प्रतिस्थापन"],
                answer: 1
            },
            {
                text: "लाल तप्त आयरन पर जलवाष्प प्रवाहित करने पर कौन-सा यौगिक प्राप्त होता है?",
                options: ["FeO", "Fe₃O₄", "Fe₂O₃", "FeS"],
                answer: 2
            },
            {
                text: "जब सोडियम हाइड्रोक्साइड जिंक से अभिक्रिया करता है, तो कौन सा उत्पाद बनता है?",
                options: ["Na₂ZnO₂ + H₂", "NaZnO₂ + H₂", "NaOZn₂ + H₂", "Na₂ZnO₂ + H₂"],
                answer: 0
            },
            {
                text: "दूध से दही बनना कैसा परिवर्तन है?",
                options: ["भौतिक", "रासायनिक", "दोनों भौतिक और रासायनिक", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "निम्नलिखित में कौन-सा पदार्थ बिना ज्वाला के जलता है?",
                options: ["मोमबत्ती", "किरोसीन", "कोयला", "मेथेन गैस"],
                answer: 2
            },
            {
                text: "आलू चिप्स की थैली में कौन-सी गैस भरी रहती है?",
                options: ["ऑक्सीजन", "नाइट्रोजन", "हीलियम", "मिथेन"],
                answer: 1
            },
            {
                text: "सिल्वर क्लोराइड (AgCl) का रंग क्या है?",
                options: ["श्वेत", "हरा", "लाल", "भूरा"],
                answer: 0
            },
            {
                text: "जब मैग्नीशियम फीता को जलाया जाता है, तो उत्पन्न आग की लौ होती है?",
                options: ["पीली", "चमकीला ऊजला", "लाल", "नीली"],
                answer: 1
            },
            {
                text: "निम्नलिखित में से कौन द्विविस्थापन अभिक्रिया है?",
                options: ["2H₂ + O₂ → 2H₂O", "2Mg + O₂ → 2MgO", "AgNO₃ + NaCl → AgCl + NaNO₃", "H₂ + Cl₂ → 2HCl"],
                answer: 2
            },
            {
                text: "Zn + CuSO₄ → ZnSO₄ + Cu रासायनिक अभिक्रिया किस प्रकार की है?",
                options: ["संयोजन अभिक्रिया", "विस्थापन अभिक्रिया", "द्विविस्थापन अभिक्रिया", "वियोजन अभिक्रिया"],
                answer: 1
            },
            {
                text: "लौह-चूर्ण पर तनु हाइड्रोक्लोरिक अम्ल डालने से क्या होता है?",
                options: ["हाइड्रोजन गैस एवं आयरन क्लोराइड बनता है।", "क्लोरीन गैस एवं आयरन हाइड्रॉक्साइड बनता है।", "कोई अभिक्रिया नहीं होती है।", "आयरन लवण एवं जल बनता है"],
                answer: 0
            },
            {
                text: "लोहा को जिंक से लेपित करने की क्रिया को कहते हैं?",
                options: ["संक्षारण", "गैल्वनीकरण", "पानी चढ़ाना", "विद्युत अपघटन"],
                answer: 1
            },
            {
                text: "नाइट्रोजन डाइऑक्साइड (NO₂) के धुंए का रंग होता है?",
                options: ["भूरा", "लाल", "हरा", "पीला"],
                answer: 0
            },
            {
                text: "लोहे पर जंग लगने की क्रिया को क्या कहते हैं?",
                options: ["संक्षारण", "विकृतगंधिता", "विस्थापन", "इनमें से कोई नहीं"],
                answer: 0
            },
            {
                text: "निम्नलिखित में से कौन सा बुझा हुआ चूना है?",
                options: ["CaO", "Ca(OH)₂", "CaCO₃", "Ca"],
                answer: 1
            },
            {
                text: "रासायनिक अभिक्रिया में भाग लेनेवाले पदार्थों को कहते हैं",
                options: ["प्रतिफल", "अभिक्रिया", "अभिकारक", "इनमें सभी"],
                answer: 2
            },
            {
                text: "Fe₂O₃ + 2Al → Al₂O₃ + 2Fe दी गयी अभिक्रिया किस प्रकार की है?",
                options: ["संयोजन अभिक्रिया", "द्विविस्थापन अभिक्रिया", "वियोजन अभिक्रिया", "विस्थापन अभिक्रिया"],
                answer: 3
            },
            {
                text: "CuO + H₂ → Cu + H₂O किस प्रकार की अभिक्रिया है?",
                options: ["उपचयन", "अपचयन", "उदासीनीकरण", "रेडॉक्स"],
                answer: 3
            },
            {
                text: "लिटमस विलयन जो बैंगनी रंग का रंजक होता है यह किस पदार्थ का बना होता है?",
                options: ["कवक", "लिचेन", "जिम्नोस्पर्म", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "निम्नलिखित में कौन बेकिंग पाउडर है?",
                options: ["मिश्रण", "यौगिक", "तत्व", "मिश्रधातु"],
                answer: 0
            },
            {
                text: "निम्नलिखित में से कौन सूचक की तरह इस्तेमाल नहीं किया जा सकता है?",
                options: ["हल्दी", "मेथिल ऑरेंज", "फीनॉल्फथेलिन", "मूली"],
                answer: 3
            },
            {
                text: "निम्नलिखित में कौन क्षारक है?",
                options: ["ZnO", "SO₂", "CO₂", "NO₂"],
                answer: 0
            },
            {
                text: "पोटाश एलम होते हैं?",
                options: ["एक साधारण लवण", "एक मिश्रित लवण", "एक अम्लीय लवण", "एक दिक् लवण"],
                answer: 3
            },
            {
                text: "हमारा शरीर pH मान के किस परिसर में सही तरीके से कार्य करता है?",
                options: ["2-3", "5-7", "7.0-7.8", "9.0-9.5"],
                answer: 2
            },
            {
                text: "तनु HCl का pH मान होगा?",
                options: ["6", "7", "8", "0"],
                answer: 3
            },
            {
                text: "निम्नलिखित में सबसे प्रबल लवण कौन है?",
                options: ["NaCl", "CaCl₂", "BaSO₄", "LiCl"],
                answer: 0
            },
            {
                text: "बहते हुए रक्त को रोकने में उपयोगी यौगिक है।",
                options: ["खाने का सोडा", "नौसादर", "धोवन सोडा", "फिटकरी"],
                answer: 3
            },
            {
                text: "धातु के ऑक्साइड होते हैं?",
                options: ["अम्ल", "क्षारक", "लवण", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "जल का pH मान कितना होता है?",
                options: ["7", "3", "10", "4"],
                answer: 0
            },
            {
                text: "निम्नलिखित में से कौन-सा बुझा हुआ चूना है?",
                options: ["CaO", "Ca(OH)₂", "CaCO₃", "Ca"],
                answer: 1
            },
            {
                text: "विरंजक चूर्ण का रासायनिक सूत्र है?",
                options: ["CaCl₂", "CaO", "Ca(OCl)₂", "Ca(OCl)"],
                answer: 2
            },
            {
                text: "चींटी के डंक और नेटल के डंक में कौन-सा अम्ल पाया जाता है?",
                options: ["सिट्रिक अम्ल", "लैटिक अम्ल", "ऐसीटिक अम्ल", "मेथैनॉइक अम्ल"],
                answer: 3
            },
            {
                text: "अम्ल-वर्षा कहलाने के लिए आवश्यक है कि वर्षा के जल का pH मान-",
                options: ["7 से कम हो जाए", "5.6 से कम हो जाए", "8.6 से अधिक हो जाए", "10 हो जाए"],
                answer: 1
            },
            {
                text: "ग्लूकोज का रासायनिक सूत्र होता है?",
                options: ["C₂H₅OH", "C₆H₁₂O₆", "CHO", "C₆H₆"],
                answer: 1
            },
            {
                text: "ऐसेटिक अम्ल का IUPAC नाम है:",
                options: ["ऐथेनॉइक अम्ल", "मेथेनॉइक अम्ल", "प्रोपेनोन", "इनमें से कोई नहीं"],
                answer: 0
            },
            {
                text: "निम्नलिखित में कौन-सा आयन लाल लिटमस को नीला कर सकता है?",
                options: ["H⁺", "OH⁻", "Cl⁻", "O₂⁻"],
                answer: 1
            },
            {
                text: "फेरस सल्फेट क्रिस्टल का रंग होता है?",
                options: ["सफेद", "हरा", "लाल", "भूरा"],
                answer: 1
            },
            {
                text: "निम्नांकित में कौन एक अम्ल है?",
                options: ["CaO", "KOH", "HCl", "Na₂O"],
                answer: 2
            },
            {
                text: "पत्तियों में गैसों का आदान-प्रदान कहाँ होता है?",
                options: ["शिरा", "रंध्र", "मध्यशिरा", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "पौधों में वाष्पोत्सर्जन किस भाग में होता है?",
                options: ["जड़", "पत्ता", "फूल", "तना"],
                answer: 1
            },
            {
                text: "मानव रक्त में उपस्थित यूरिया की सामान्य मात्रा होती है-",
                options: ["100 mg", "20 mg", "30 mg", "40 mg"],
                answer: 2
            },
            {
                text: "रक्त में आयरन की कमी से होने वाला एक रोग है?",
                options: ["टी.बी.", "मधुमेह", "एनीमिया", "उच्च रक्त चाप"],
                answer: 2
            },
            {
                text: "कौन-सी क्रिया सभी जीव के लिए अनिवार्य है?",
                options: ["प्रकाश संश्लेषण", "वाष्पोत्सर्जन", "श्वसन", "चलन"],
                answer: 2
            },
            {
                text: "श्वसन क्रिया के दौरान कितनी प्रतिशत ऊर्जा ताप के रूप में निष्काषित होती है?",
                options: ["20%", "40%", "60%", "80%"],
                answer: 0
            },
            {
                text: "मनुष्य में वृक्क एक तंत्र का भाग है जो संबंधित है-",
                options: ["पोषण", "श्वसन", "उत्सर्जन", "परिवहन"],
                answer: 2
            },
            {
                text: "पादय में जाइलम उत्तरदायी है-",
                options: ["जल का वहन", "भोजन का वहन", "अमीनो अम्ल का वहन", "ऑक्सीजन का वहन"],
                answer: 0
            },
            {
                text: "रक्त इनमें किसकी उपस्थिति के कारण लाल दिखता है?",
                options: ["गोंबिन", "हीमोग्लोबिन", "थ्रोबोप्लास्टिन", "फाइब्रिन"],
                answer: 1
            },
            {
                text: "पौधों के वायवीय भागों से जल के निष्कर्ष की क्रिया कहलाती है-",
                options: ["परागण", "निषेचन", "विसरण", "वाष्पोत्सर्जन"],
                answer: 3
            },
            {
                text: "वह प्रक्रम जिनके द्वारा शरीर में ऊर्जा का उत्पादन होता है कहलाता है-",
                options: ["श्वसन", "पोषण", "उत्सर्जन", "उत्तेजनशीलता"],
                answer: 0
            },
            {
                text: "प्रकृति में ऑक्सीजन का संतुलन कैसे बना रहता है?",
                options: ["संयोजन क्रिया", "प्रकाश संश्लेषण", "अपघटन", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "मनुष्यों में साँस लेने और छोड़ने की क्रिया को क्या कहा जाता है?",
                options: ["श्वसन", "श्वासोच्छवास", "निश्वसन", "निःश्वसन"],
                answer: 1
            },
            {
                text: "मैग्नीशियम पाया जाता है?",
                options: ["क्लोरोफिल में", "लाल रक्त कण में", "वर्णी लवक में", "श्वेत रक्त कण में"],
                answer: 0
            },
            {
                text: "मानव हृदय में पाये जाते हैं?",
                options: ["3 वेश्म", "2 वेश्म", "4 वेश्म", "5 वेश्म"],
                answer: 2
            },
            {
                text: "कौन - सा इन्जाइम इमल्सीकृत वसा का पाचन करता है?",
                options: ["पेप्सिन", "ट्रिप्सिन", "लाइपेज", "इनमें से कोई नहीं"],
                answer: 2
            },
            {
                text: "सामान्य प्रकुंचन रक्त दाब होता है?",
                options: ["80 mm", "100 mm", "120 mm", "130 mm"],
                answer: 2
            },
            {
                text: "निम्नलिखित में से कौन उभयलिंगी जन्तु है?",
                options: ["केंचुआ", "मछली", "शेर", "बकरी"],
                answer: 0
            },
            {
                text: "मानव हृदय का औसत प्रकुंचन दाब है लगभग:",
                options: ["140/90", "120/80", "200/90", "150/90"],
                answer: 1
            },
            {
                text: "मनुष्य में वृक्क एक तंत्र का भाग है जो संबंधित है:",
                options: ["पोषण से", "श्वसन से", "उत्सर्जन से", "परिवहन से"],
                answer: 2
            },
            {
                text: "जिबरेलिन है-",
                options: ["वसा", "एन्जाइम", "हार्मोन", "कार्बोहाइड्रेट"],
                answer: 2
            },
            {
                text: "मोटर कार के हेडलाइट में किसका प्रयोग होता है?",
                options: ["समतल दर्पण", "उतल दर्पण", "उतल लेंस", "अवतल दर्पण"],
                answer: 3
            },
            {
                text: "यदि किसी अवतल दर्पण की फोकस दूरी f तथा वक्रता त्रिज्या R हो, तो-",
                options: ["f = R/2", "f = 2R", "f = 3R/2", "f = Rx2"],
                answer: 0
            },
            {
                text: "दाढ़ी बनाने में किस प्रकार के दर्पण का उपयोग किया जाता है?",
                options: ["समतल", "उत्तल", "अवतल", "इनमें से कोई नहीं"],
                answer: 2
            },
            {
                text: "गोलीय दर्पण में फोकसांतर एवं वक्रता त्रिज्या के बीच सम्बन्ध-",
                options: ["r = 2f", "2", "f = r/2", "r = f"],
                answer: 2
            },
            {
                text: "काल्पनिक प्रतिबिम्ब होता है-",
                options: ["सीधा", "उल्टा", "दोनों", "कोई नहीं"],
                answer: 0
            },
            {
                text: "1 मीटर फोकस दूरी वाले उत्तल लेंस की क्षमता होगी?",
                options: ["-1 D", "1 D", "2 D", "1.5 D"],
                answer: 1
            },
            {
                text: "अवतल दर्पण से परावर्तन के बाद मुख्य अक्ष के समांतर एक किरण...... से होकर गुजरती है।",
                options: ["वक्रता केंद्र (C)", "मुख्य फोकस (F)", "ध्रुव (P)", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "किसी दर्पण से वस्तु को कहीं भी रखने से वस्तु के बराबर आकार का सीधा प्रतिबिम्ब बनता है तो दर्पण होगा-",
                options: ["उत्तल", "अवतल", "समतल तथा उत्तल", "समतल"],
                answer: 3
            },
            {
                text: "किसी उत्तल लेंस की फोकस दूरी हमेशा होती है?",
                options: ["(+) Ve", "(-) Ve", "(±) Ve", "♾️"],
                answer: 0
            },
            {
                text: "किस लेंस के द्वारा सिर्फ काल्पनिक प्रतिबिम्ब बनता है?",
                options: ["उत्तल", "अवतल", "वैकल्पिक", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "प्रकाश के अपवर्तन के कितने नियम हैं?",
                options: ["एक", "दो", "चार", "तीन"],
                answer: 1
            },
            {
                text: "प्रकाश का वर्ण विक्षेपण किस उपकरण से संभव होता है?",
                options: ["दर्पण", "लेंस", "प्रिज्म", "काँच की सिल्ली"],
                answer: 2
            },
            {
                text: "सरल सूक्ष्मदर्शी में किसका उपयोग होता है?",
                options: ["अवतल दर्पण", "उत्तल दर्पण", "अवतल लेंस", "उत्तल लेंस"],
                answer: 3
            },
            {
                text: "किसी गोलीय दर्पण की वक्रता त्रिज्या 50 सेमी है तो उसकी फोकस दूरी होगी",
                options: ["50 cm", "40 cm", "25 cm", "10 cm"],
                answer: 2
            },
            {
                text: "1 मीटर फोकस दूरी वाले उत्तल लेंस की क्षमता होगी",
                options: ["-1 D", "2 D", "1 D", "1.5 D"],
                answer: 2
            },
            {
                text: "किस दर्पण से वस्तु का बड़ा प्रतिबिम्ब बनता है?",
                options: ["समतल", "अवतल", "उत्तल", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "प्रकाश का वेग न्यूनतम होता है?",
                options: ["निर्वात में", "जल में", "वायु में", "कांच में"],
                answer: 3
            },
            {
                text: "निम्न में से कौन-सा पदार्थ लेंस बनाने के लिए प्रयुक्त नहीं किया जा सकता?",
                options: ["जल", "काँच", "प्लास्टिक", "मिट्टी"],
                answer: 3
            },
            {
                text: "4D क्षमता वाले अवतल लेंस की फोकस दूरी होगी-",
                options: ["20 सेमी", "25 सेमी", "30 सेमी", "40 सेमी"],
                answer: 1
            },
            {
                text: "जब प्रकाश की किरण हवा से कांच में प्रवेश करती है तो मुड़ जाती है?",
                options: ["अभिलम्ब से दूर", "अभिलम्ब के निकट", "अभिलम्ब के समानान्तर", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "आकाश का रंग नीला प्रतीत होता है-",
                options: ["प्रकाश के परावर्तन के कारण", "प्रकाश के प्रकीर्णन के कारण", "प्रकाश के अपवर्तन के कारण", "इनमें कोई भी नहीं"],
                answer: 1
            },
            {
                text: "मानव नेत्र जिस भाग पर किसी वस्तु का प्रतिबिंब बनाते हैं वह है?",
                options: ["कॉर्निया", "परितारिका", "पुतली", "दृष्टिपटल"],
                answer: 3
            },
            {
                text: "जो नेत्र निकट स्थित वस्तु को साफ नहीं देख सकता उस नेत्र में होता है?",
                options: ["दूर दृष्टिदोष", "निकट दृष्टि", "दोष जरा", "दृष्टिदोष वर्णांधता"],
                answer: 0
            },
            {
                text: "चन्द्रमा पर खड़े अंतरिक्ष यात्री को आकाश प्रतीत होता है?",
                options: ["नीला", "लाल", "काला", "उजला"],
                answer: 2
            },
            {
                text: "नेत्र में किसी वस्तु का बना प्रतिबिम्ब होता है।",
                options: ["काल्पनिक, सीधा तथा छोटा", "काल्पनिक, उल्टा तथा बड़ा", "वास्तविक, उल्टा तथा छोटा", "वास्तविक, उल्टा तथा बड़ा"],
                answer: 2
            },
            {
                text: "निकट दृष्टिदोष का निवारण किस लेंस से होता है?",
                options: ["उत्तल", "अवतल", "बाइफोकल", "सिलिन्ड्रिकल"],
                answer: 1
            },
            {
                text: "मानव नेत्र के किस भाग पर किसी वस्तु का प्रतिबिंब बनाते हैं?",
                options: ["कॉर्निया", "परितारिका", "पुतली", "रेटिना या दृष्टिपटल"],
                answer: 3
            },
            {
                text: "स्पेक्ट्रम में किस रंग की किरण का झुकाव अधिक होता है?",
                options: ["लाल", "पीला", "बैंगनी", "हरा"],
                answer: 2
            },
            {
                text: "दीर्घ-दृष्टि दोष को ठीक करने के लिए उपयोग किया जाता है-",
                options: ["गोलीय बेलनाकार लेंस", "उत्तल लेंस", "समोत्तल लेंस", "अवतल लेंस"],
                answer: 1
            },
            {
                text: "श्वेत प्रकाश जब प्रिज्म से गुजरता है तो सर्वाधिक विचलन होता है?",
                options: ["लाल रंग का", "पीले रंग का", "बैंगनी रंग का", "हरे रंग का"],
                answer: 2
            },
            {
                text: "नेत्र में प्रवेश करने वाली प्रकाश किरणों का अधिकांश अपवर्तन होता है?",
                options: ["नेत्रोद अंतर पृष्ठ पर", "अभिनेत्र के अंतरपृष्ठ पर", "कॉर्निया के बाहरी पृष्ठ पर", "इनमें से कोई नहीं"],
                answer: 2
            },
            {
                text: "आकाश का रंग नीला होने का कारण है?",
                options: ["परावर्तन", "प्रकीर्णन", "अपवर्तन", "इनमें से कोई नहीं"],
                answer: 1
            },
            {
                text: "मानव नेत्र में प्रकाश किस रास्ते प्रवेश करता है?",
                options: ["कॉर्निया", "लेंस", "पुतली", "आइरिस"],
                answer: 2
            },
            {
                text: "कैमरे की तरह नेत्र में प्रवेश करते प्रकाश के परिमाण को नियंत्रित करता है?",
                options: ["कॉर्निया", "लेंस", "आइरिस", "पुतली"],
                answer: 2
            },
            {
                text: "किस दृष्टि दोष को अवतल और उत्तल दोनों लेंसों से बने द्विफोकसी लेंस द्वारा संशोधित किया जा सकता है?",
                options: ["निकट दृष्टि दोष", "जरा-दूर दृष्टिता", "दीर्घ-दृष्टि दोष", "मोतियाबिंद"],
                answer: 1
            },
            {
                text: "स्वस्थ आँख के दूरी बिन्दु होता है?",
                options: ["25 सेमी", "शून्य", "250 सेमी", "अनंत से 25 सेमी"],
                answer: 3
            },
            {
                text: "अभिनेत्र लेंस की फोकस दूरी में परिवर्तन किया जाता है?",
                options: ["परितारिका द्वारा", "पुतली द्वारा", "दृष्टिपटल द्वारा", "पक्ष्माभी पेशियों द्वारा"],
                answer: 3
            },
            {
                text: "नेत्र लेंस की फोकस दूरी कम हो जाने से कौन-सा दृष्टि दोष होता है?",
                options: ["निकट दृष्टिदोष", "दूर दृष्टिदोष", "जरा दूरदर्शिता", "इनमें से कोई नहीं"],
                answer: 0
            },
            {
                text: "प्रकाश के किस रंग का तरंगदैर्ध्य सबसे अधिक होता है?",
                options: ["बैंगनी", "हरा", "लाल", "पीला"],
                answer: 2
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
