const generateHealthResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  const responses = {
    // Symptom-based responses
    'headache': [
      "I understand you're experiencing headaches. Here are some general suggestions: 1) Stay hydrated by drinking plenty of water, 2) Try to rest in a quiet, dark room, 3) Apply a cold or warm compress to your head, 4) Practice relaxation techniques. If headaches persist, worsen, or are accompanied by other symptoms, please consult a healthcare professional immediately.",
      "Headaches can have various causes. Consider these steps: Check if you're dehydrated, ensure you're getting adequate sleep, reduce screen time, and try gentle neck stretches. However, if you experience severe, sudden headaches or they're different from your usual pattern, seek medical attention promptly."
    ],
    
    'fever': [
      "If you have a fever, it's important to: 1) Rest and stay hydrated, 2) Monitor your temperature regularly, 3) Use over-the-counter fever reducers as directed, 4) Wear light clothing. Please consult a healthcare provider if your fever is high (over 103°F/39.4°C), persists for more than 3 days, or you have concerning symptoms.",
      "Fever is often your body's way of fighting infection. Stay hydrated, rest, and monitor your symptoms. Seek immediate medical attention if you experience difficulty breathing, chest pain, severe headache, or if you're concerned about your condition."
    ],
    
    'cough': [
      "For a cough, try these remedies: 1) Stay hydrated with warm liquids like tea with honey, 2) Use a humidifier or breathe steam, 3) Avoid irritants like smoke. If your cough persists for more than 2 weeks, produces blood, or is accompanied by fever and difficulty breathing, please see a doctor.",
      "Coughs can be due to various causes. Honey and warm water can help soothe throat irritation. If you have a persistent cough, especially with other symptoms like fever, chest pain, or shortness of breath, it's important to get medical evaluation."
    ],

    // Nutrition responses
    'diet': [
      "A healthy diet should include: 1) Plenty of fruits and vegetables (5-9 servings daily), 2) Whole grains instead of refined grains, 3) Lean proteins like fish, poultry, beans, and nuts, 4) Limited processed foods and added sugars. Remember to stay hydrated and practice portion control.",
      "For optimal nutrition: Focus on colorful fruits and vegetables, choose whole grains, include healthy fats like avocados and olive oil, limit saturated fats and sodium. Meal planning and cooking at home can help you maintain better control over your nutrition."
    ],
    
    'weight': [
      "Healthy weight management involves: 1) Balanced nutrition with appropriate portions, 2) Regular physical activity (aim for 150 minutes of moderate exercise weekly), 3) Adequate sleep (7-9 hours), 4) Stress management. Avoid crash diets and focus on sustainable lifestyle changes. Consider consulting a healthcare provider or nutritionist for personalized guidance.",
      "Weight management is about creating healthy habits: Eat mindfully, stay active, get enough sleep, and manage stress. Small, consistent changes work better than drastic measures. If you have concerns about your weight, discuss with a healthcare professional who can provide personalized advice."
    ],

    // Exercise responses
    'exercise': [
      "Regular exercise recommendations include: 1) At least 150 minutes of moderate aerobic activity weekly, 2) Strength training exercises 2+ times per week, 3) Start slowly and gradually increase intensity, 4) Choose activities you enjoy. Always consult your doctor before starting a new exercise program, especially if you have health conditions.",
      "Physical activity benefits both physical and mental health. Start with activities you enjoy - walking, dancing, swimming, or cycling. Aim for consistency rather than intensity initially. If you're new to exercise or have health concerns, consult a healthcare provider first."
    ],

    // Sleep responses
    'sleep': [
      "For better sleep: 1) Maintain a consistent sleep schedule, 2) Create a relaxing bedtime routine, 3) Keep your bedroom cool, dark, and quiet, 4) Avoid caffeine and screens before bedtime, 5) Aim for 7-9 hours per night. If you have persistent sleep problems, consider consulting a healthcare provider.",
      "Good sleep hygiene includes: Regular sleep times, a comfortable sleep environment, limiting daytime naps, avoiding large meals and alcohol before bed. If you continue to have sleep difficulties despite good habits, it may be worth discussing with a healthcare professional."
    ],

    // Stress responses
    'stress': [
      "Stress management techniques include: 1) Deep breathing exercises, 2) Regular physical activity, 3) Meditation or mindfulness practices, 4) Maintaining social connections, 5) Getting adequate sleep. If stress becomes overwhelming or affects your daily life, consider speaking with a mental health professional.",
      "To manage stress: Practice relaxation techniques, maintain a healthy lifestyle, set realistic goals, and don't hesitate to ask for support. Chronic stress can affect physical health, so it's important to develop healthy coping strategies. Professional counseling can be very helpful."
    ],

    // General health responses
    'water': [
      "Staying hydrated is important: 1) Aim for 8-10 glasses of water daily, but needs vary by individual, 2) Drink more during hot weather or when exercising, 3) You can also get fluids from fruits, vegetables, and other beverages, 4) Listen to your body's thirst cues.",
      "Proper hydration supports many body functions. While 8 glasses daily is a general guideline, your needs may vary based on activity level, climate, and overall health. Good hydration helps with energy, digestion, and temperature regulation."
    ]
  };

  // Check for keywords in the message
  for (const [keyword, responseArray] of Object.entries(responses)) {
    if (lowerMessage.includes(keyword)) {
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  }

  // Default responses for general health queries
  const defaultResponses = [
    "Thank you for your health question! While I can provide general health information, please remember that I'm not a substitute for professional medical advice. For specific health concerns, it's always best to consult with a qualified healthcare provider. How can I assist you with general health information today?",
    
    "I'm here to help with general health information! However, for personalized medical advice, diagnosis, or treatment, please consult with a healthcare professional. What specific area of health and wellness would you like to learn more about?",
    
    "That's a great health-related question! I can share general wellness information, but everyone's health needs are unique. For personalized guidance, especially for specific symptoms or conditions, please speak with a healthcare provider. What health topic can I help explain?",
    
    "I'd be happy to provide general health information! Remember that this guidance is educational and not a replacement for professional medical care. If you have specific health concerns, please consult with a qualified healthcare provider. What would you like to know about health and wellness?"
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// @desc    Process chat message and return AI response
// @route   POST /api/chat
// @access  Private
const processChat = async (req, res) => {
  try {
    const { message, language = 'english' } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Generate response based on message content
    let response = generateHealthResponse(message);

    // Add language-specific prefix if not English
    if (language !== 'english') {
      const languagePrefixes = {
        hindi: "मैं आपकी स्वास्थ्य संबंधी चिंताओं को समझता हूं। यहां सामान्य जानकारी है: ",
        bengali: "আমি আপনার স্বাস্থ্য সংক্রান্ত উদ্বেগ বুঝতে পারি। এখানে সাধারণ তথ্য রয়েছে: ",
        tamil: "உங்கள் ஆரோக்கிய கவலைகளை நான் புரிந்துகொள்கிறேன். இதோ பொதுவான தகவல்: ",
        marathi: "मला तुमच्या आरोग्याच्या चिंता समजतात. येथे सामान्य माहिती आहे: "
      };
      
      if (languagePrefixes[language]) {
        response = languagePrefixes[language] + response;
      }
    }

    // Log the interaction (in production, you might want to store this in database)
    console.log(`Chat interaction - User: ${req.user.id}, Message: ${message.substring(0, 100)}`);

    res.json({
      success: true,
      data: {
        message: response,
        timestamp: new Date(),
        language
      }
    });
  } catch (error) {
    console.error('Process chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing chat',
      error: error.message
    });
  }
};

module.exports = {
  processChat
};