
import { GoogleGenAI, Type } from "@google/genai";
import { QuizResult, LearnerProfile } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateMentorResponse = async (
  userMessage: string,
  context: string,
  profile: LearnerProfile | null
): Promise<string> => {
  try {
    let learnerContext = "";
    if (profile) {
        learnerContext = `
        THE LEARNER'S BACKGROUND (Use this to tailor your analogies):
        - Role: ${profile.role}
        - Industry: ${profile.industry}
        - Experience: ${profile.yearsExperience}
        - Technical Comfort: ${profile.technicalComfort}
        - Goal: ${profile.goal}
        
        INSTRUCTION: 
        1. If the user is from ${profile.industry}, use analogies relevant to that field.
        2. If Technical Comfort is 'low', strictly avoid jargon or define it immediately.
        3. Frame advice to help them reach their goal: "${profile.goal}".
        `;
    }

    const systemInstruction = `
You are a world-class AI Product Management Mentor.
Your goal is to help a Senior Product Manager transition into an AI PM role.
You are knowledgeable about the 3 Archetypes (Core AI, Platform, Application).
You advocate for the shift from "Deterministic" to "Probabilistic" thinking.

${learnerContext}

CRITICAL OUTPUT RULES:
1. Keep your main response CONCISE (max 2-3 paragraphs). Use markdown for readability.
2. At the very end of your response, you MUST append a section starting with "---FOLLOW_UP---" followed by exactly 3 suggested follow-up questions the user might want to ask next, separated by a pipe character "|".
Example Output:
"RAG is like an open-book test... [Main explanation] ...
---FOLLOW_UP---
What are the main risks of RAG?|How much does RAG cost?|Give me a real world example."

Current Conversation Context: ${context}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 0 } 
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the matrix right now. Please check your API key or try again later.";
  }
};

export const evaluateQuizAnswer = async (
  question: string,
  userAnswer: string,
  rubric: string,
  profile: LearnerProfile | null
): Promise<QuizResult> => {
   try {
    let profileContext = "";
    if (profile) {
        profileContext = `
        The user is a ${profile.role} in ${profile.industry} with ${profile.technicalComfort} technical comfort.
        Adjust your feedback tone accordingly. If they are non-technical, explain technical gaps simply. 
        If they are expert, be rigorous.
        `;
    }

    const prompt = `
    You are an expert evaluator for AI Product Managers.
    
    Question: ${question}
    User Answer: ${userAnswer}
    Scoring Rubric: ${rubric}
    
    User Profile Context: ${profileContext}

    Evaluate the user's answer accurately.
    Return a JSON object with:
    - "level": number (1, 3, or 5).
    - "score": number (0-100, representing quality within that level).
    - "feedback": string (Concise explanation of why they got this score and what was missing. Use analogies relevant to their industry if possible).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                level: { type: Type.INTEGER },
                score: { type: Type.INTEGER },
                feedback: { type: Type.STRING }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    
    return JSON.parse(text) as QuizResult;
   } catch (error) {
     console.error("Eval Error", error);
     return {
         level: 1,
         score: 0,
         feedback: "Error evaluating response. Please try again."
     };
   }
};
