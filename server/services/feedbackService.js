import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateInterviewFeedback = async (
  messages,
  techStack,
  difficulty,
) => {
  try {
    const systemPrompt = `
You are an expert technical interviewer.

Analyze the candidate interview.

Tech Stack: ${techStack}
Difficulty: ${difficulty}

IMPORTANT:
Return ONLY valid JSON.

Do NOT add:
- explanations
- markdown
- intro text
- code blocks

Return this exact format:

{
  "score": 8,
  "strengths": [
    "Strength 1",
    "Strength 2",
    "Strength 3"
  ],
  "weaknesses": [
    "Weakness 1",
    "Weakness 2",
    "Weakness 3"
  ],
  "summary": "Short summary"
}
`;

    const formattedMessages = [
      {
        role: "system",
        content: systemPrompt,
      },

      ...messages,
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: formattedMessages,

      temperature: 0.2,
    });

    const rawText = response.choices[0].message.content;

    // extract JSON safely
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error("Invalid JSON response");
    }

    const parsedFeedback = JSON.parse(jsonMatch[0]);

    return parsedFeedback;
  } catch (error) {
    console.log("Feedback Error:", error);

    // fallback feedback
    return {
      score: 5,

      strengths: [
        "Good effort",
        "Attempted all questions",
        "Basic understanding shown",
      ],

      weaknesses: [
        "Needs deeper concepts",
        "Needs more practice",
        "Communication can improve",
      ],

      summary: "Candidate completed the interview with average performance.",
    };
  }
};
