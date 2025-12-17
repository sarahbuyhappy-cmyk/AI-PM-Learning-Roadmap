
import { WeekPlan, CompetencyDimension, Archetype, QuizQuestion, SkillNode, WeeklyQuiz } from './types';

export const ROADMAP_WEEKS: WeekPlan[] = [
  // Phase 1: Foundations
  {
    week: 1,
    phase: "Phase 1: Foundations (Engineering Mindset)",
    title: "Deep Learning & LLM Fundamentals",
    description: "Break the 'black box' illusion. Understand how models actually work under the hood.",
    tasks: [
      "Watch Andrew Ng's 'Generative AI with LLMs' (Audit for Free)",
      "Watch Andrej Karpathy's 'Intro to Large Language Models'",
      "Read 'The Illustrated Transformer' for visual understanding"
    ],
    resources: [
      { title: "Course: Generative AI with LLMs (Coursera Audit Free)", url: "https://www.coursera.org/learn/generative-ai-with-llms" },
      { title: "Video: Intro to LLMs (Karpathy)", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
      { title: "Visual Guide: The Illustrated Transformer", url: "https://jalammar.github.io/illustrated-transformer/" },
      { title: "Math Intuition: Neural Networks (3Blue1Brown)", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" }
    ],
    output: "A one-page explanation of Transformer Architecture.",
    relatedCompetencies: ["tech"]
  },
  {
    week: 2,
    phase: "Phase 1: Foundations (Engineering Mindset)",
    title: "Advanced Prompt Engineering",
    description: "Move beyond basic prompting to structured engineering techniques.",
    tasks: [
      "Study Anthropic System Prompts",
      "Master CoT (Chain of Thought) & Few-Shot prompting",
      "Use Promptfoo to benchmark prompt performance"
    ],
    resources: [
      { title: "Interactive Guide: LearnPrompting.org", url: "https://learnprompting.org/docs/intro" },
      { title: "Guide: Anthropic Prompt Engineering", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview" },
      { title: "Course: ChatGPT Prompt Engineering for Devs", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
      { title: "Tool: Promptfoo (Eval CLI)", url: "https://www.promptfoo.dev/" }
    ],
    output: "An optimized system prompt with benchmark results.",
    relatedCompetencies: ["tech", "prob"]
  },
  {
    week: 3,
    phase: "Phase 1: Foundations (Engineering Mindset)",
    title: "RAG & Data Architecture",
    description: "Learn how to ground models with external data.",
    tasks: [
      "Take 'LangChain for LLM Apps' short course",
      "Understand Vector Database basics",
      "Compare RAG vs. Fine-tuning trade-offs"
    ],
    resources: [
      { title: "Course: LangChain for LLM Apps (Free)", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/" },
      { title: "Guide: Pinecone Learning Center", url: "https://www.pinecone.io/learn/" },
      { title: "Article: RAG vs Fine-tuning (Scale AI)", url: "https://scale.com/guides/llm-fine-tuning-vs-rag" },
      { title: "Video: RAG from Scratch", url: "https://www.youtube.com/watch?v=wd7TZ4w1mSw" }
    ],
    output: "Architecture diagram for a RAG-based knowledge base.",
    relatedCompetencies: ["tech", "data"]
  },
  {
    week: 4,
    phase: "Phase 1: Foundations (Engineering Mindset)",
    title: "Vibe Coding / Prototyping",
    description: "Build something yourself without waiting for engineers.",
    tasks: [
      "Use Cursor + Vercel AI SDK to scaffold an app",
      "Build a simple 'News Summarizer' or 'Chatbot'",
      "Deploy to the web"
    ],
    resources: [
      { title: "Tool: Cursor Editor (Free Tier)", url: "https://cursor.sh/" },
      { title: "Docs: Vercel AI SDK", url: "https://sdk.vercel.ai/docs" },
      { title: "Platform: v0.dev (UI Gen)", url: "https://v0.dev/" },
      { title: "Inspiration: Streamlit App Gallery", url: "https://streamlit.io/gallery" }
    ],
    output: "A functional, deployed Web App prototype.",
    relatedCompetencies: ["tech"]
  },
  // Phase 2: Strategy
  {
    week: 5,
    phase: "Phase 2: Strategy (CEO Mindset)",
    title: "AI Economics & Pricing",
    description: "Understand the cost of intelligence.",
    tasks: [
      "Analyze Token Costs (Input vs Output)",
      "Build a Unit Economics model",
      "Study 'Seat-based' vs 'Consumption' pricing"
    ],
    resources: [
      { title: "Benchmarks: Artificial Analysis (Models & Pricing)", url: "https://artificialanalysis.ai/" },
      { title: "Tool: LLM Price Calculator", url: "https://llm-price.com/" },
      { title: "Article: Navigating LLM Inference Costs", url: "https://www.baseten.co/blog/navigating-the-high-cost-of-llm-inference/" }
    ],
    output: "A Unit Economics spreadsheet for a hypothetical AI product.",
    relatedCompetencies: ["econ"]
  },
  {
    week: 6,
    phase: "Phase 2: Strategy (CEO Mindset)",
    title: "Evals & Data Flywheels",
    description: "Define quality and create loops for improvement.",
    tasks: [
      "Define 'Golden Datasets' for testing",
      "Understand LLM-as-a-Judge",
      "Design a user feedback loop (Thumbs up/down)"
    ],
    resources: [
      { title: "Library: Ragas (RAG Evaluation Framework)", url: "https://docs.ragas.io/en/stable/" },
      { title: "Guide: Hamel Husain on Evals", url: "https://hamel.dev/blog/posts/evals/" },
      { title: "Article: Patterns for Building LLM Systems", url: "https://eugeneyan.com/writing/llm-patterns/#evals-to-measure-performance" }
    ],
    output: "An automated evaluation pipeline design.",
    relatedCompetencies: ["prob", "data"]
  },
  {
    week: 7,
    phase: "Phase 2: Strategy (CEO Mindset)",
    title: "Agents & Tool Use",
    description: "Move from Chatbots to Agentic Workflows.",
    tasks: [
      "Read 'LLM Powered Autonomous Agents'",
      "Understand the ReAct Framework",
      "Experiment with LangChain Agents"
    ],
    resources: [
      { title: "Blog: LLM Powered Autonomous Agents (Lilian Weng)", url: "https://lilianweng.github.io/posts/2023-06-23-agent/" },
      { title: "Paper: ReAct", url: "https://arxiv.org/abs/2210.03629" },
      { title: "Docs: LangChain Agents", url: "https://python.langchain.com/docs/modules/agents/" }
    ],
    output: "An agentic feature added to your Week 4 prototype.",
    relatedCompetencies: ["tech", "prob"]
  },
  {
    week: 8,
    phase: "Phase 2: Strategy (CEO Mindset)",
    title: "Safety, Ethics & Red Teaming",
    description: "Protect your application and users.",
    tasks: [
      "Review OWASP Top 10 for LLMs",
      "Perform a Red Teaming exercise",
      "Learn about Prompt Injection defenses"
    ],
    resources: [
      { title: "Game: Gandalf (Learn Prompt Injection)", url: "https://gandalf.lakera.ai/" },
      { title: "List: OWASP Top 10 for LLM", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
      { title: "Tool: NVIDIA NeMo Guardrails", url: "https://github.com/NVIDIA/NeMo-Guardrails" }
    ],
    output: "A vulnerability report and mitigation plan.",
    relatedCompetencies: ["ethics"]
  },
  // Phase 3: Leadership
  {
    week: 9,
    phase: "Phase 3: Leadership (Market Leader)",
    title: "Mock Interview Drills",
    description: "Prepare for the top-tier AI PM interviews.",
    tasks: [
      "Watch mock AI PM interviews",
      "Practice System Design for AI",
      "Refine your 'AI Strategy' narrative"
    ],
    resources: [
      { title: "Video: AI PM Mock Interview (Exponent)", url: "https://www.youtube.com/watch?v=cM5yV7qgC9o" },
      { title: "Guide: The Product Manager Interview", url: "https://www.tryexponent.com/blog/ai-product-manager-interview-questions" },
      { title: "Channel: Dr. Nancy Li", url: "https://www.youtube.com/@DrNancyLi" }
    ],
    output: "Recorded mock interview session self-review."
  },
  {
    week: 10,
    phase: "Phase 3: Leadership (Market Leader)",
    title: "Thought Leadership",
    description: "Establish your voice in the industry.",
    tasks: [
      "Read 'Generative AI's Act Two'",
      "Write a prediction post for AI in 2026",
      "Engage in public discourse"
    ],
    resources: [
      { title: "Report: Sequoia's Generative AI Act Two", url: "https://www.sequoiacap.com/article/generative-ai-act-two/" },
      { title: "Newsletter: Stratechery (Ben Thompson)", url: "https://stratechery.com/" },
      { title: "Newsletter: The Sequence", url: "https://thesequence.substack.com/" }
    ],
    output: "Published article with 500+ views target."
  },
  {
    week: 11,
    phase: "Phase 3: Leadership (Market Leader)",
    title: "Community Building",
    description: "Network with the builders.",
    tasks: [
      "Join AI Developer Discords",
      "Contribute to open source discussions",
      "Attend a local or virtual AI meetup"
    ],
    resources: [
      { title: "Community: OpenAI Forum", url: "https://community.openai.com/" },
      { title: "Community: LangChain Discord", url: "https://discord.gg/langchain" },
      { title: "Community: Hugging Face", url: "https://huggingface.co/join/discord" }
    ],
    output: "3 meaningful connections/conversations."
  },
  {
    week: 12,
    phase: "Phase 3: Leadership (Market Leader)",
    title: "Final Capstone Demo",
    description: "Showcase your transformation.",
    tasks: [
      "Record a 3-minute Loom demo",
      "Open source your code on GitHub",
      "Polish your portfolio case study"
    ],
    resources: [
      { title: "Tool: Loom (Free Video)", url: "https://www.loom.com/" },
      { title: "Platform: GitHub", url: "https://github.com/" },
      { title: "Guide: How to Write a Good README", url: "https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/" }
    ],
    output: "A portfolio-ready AI product case study."
  }
];

export const ARCHETYPES: Archetype[] = [
  {
    id: "core-ai",
    name: "Core AI / Model PM",
    focus: "Model Capabilities, Inference Efficiency, Research Transfer",
    content: "Working with Research Scientists to define next-gen models (GPT-5, Claude 4). Optimizing inference costs and designing evaluation sets.",
    skills: "Deep Technical Background, Deep Learning Theory, Math/Stats, Reading Papers."
  },
  {
    id: "platform",
    name: "AI Platform / Infra PM",
    focus: "Infrastructure, Developer Experience, Toolchains",
    content: "Building training/deployment platforms (Azure AI, Bedrock). Designing APIs, SDKs, and managing GPU resources.",
    skills: "MLOps, Distributed Systems, Cloud Architecture, API Design, Dev Empathy."
  },
  {
    id: "application",
    name: "AI Application / Vertical PM",
    focus: "UX, Business Value, Vertical Solutions",
    content: "Applying AI to specific problems (Legal, Medical). Designing Agentic Workflows and handling Prompt Engineering + UX.",
    skills: "Product Sense, Industry Know-how, UX Design, GTM Strategy."
  }
];

export const COMPETENCIES: CompetencyDimension[] = [
  {
    id: "tech",
    name: "Technical Fluency",
    levels: {
      1: "Views AI as a black box; relies entirely on engineers.",
      3: "Understands LLM basics (Tokens, Context Window); can prompt engineer.",
      5: "Has 'Technical Intuition'. Predicts model behavior; decides RAG vs Fine-tuning; discusses RLHF data strategies."
    }
  },
  {
    id: "prob",
    name: "Probabilistic Thinking",
    levels: {
      1: "Expects 100% accuracy; frustrated by hallucinations.",
      3: "Accepts probabilistic nature; designs Human-in-the-loop flows.",
      5: "Treats uncertainty as a feature. Designs complex System Evals; builds Guardrails; leverages 'happy accidents'."
    }
  },
  {
    id: "data",
    name: "Data Strategy",
    levels: {
      1: "Focuses only on clickstream analytics.",
      3: "Understands training data importance; manages basic labeling.",
      5: "Designs Data Flywheels. Embeds implicit feedback loops; builds automated cleaning/fine-tuning pipelines."
    }
  },
  {
    id: "ethics",
    name: "Ethics & Safety",
    levels: {
      1: "Ignores risks; focuses only on features.",
      3: "Basic filtering for harmful content.",
      5: "Safety as a moat. Expert in Red Teaming; designs against Prompt Injection; understands bias & regulation."
    }
  },
  {
    id: "econ",
    name: "AI Economics",
    levels: {
      1: "Ignores inference costs; revenue focus only.",
      3: "Calculates basic API costs.",
      5: "Master of Tokenomics. Uses Model Routing, Caching, Distillation; designs outcome-based pricing models."
    }
  }
];

export const DIAGNOSTIC_QUIZ: QuizQuestion[] = [
  {
    id: "tech_arch",
    category: "tech",
    question: "Architecture Decision: RAG vs. Fine-tuning",
    scenario: "You are building a 'Doctor's Assistant' bot that needs to read 500-page patient records and provide diagnosis suggestions citing the latest medical journals. The system must be accurate and up-to-date.",
    rubric: "Level 1: Unsure or suggests standard ChatGPT. Level 3: Suggests RAG for the knowledge access. Level 5: Nuanced technical strategy (Hybrid Search, Chunking strategies, using RAG for facts + Fine-tuning for medical tone/format, NeMo guardrails for safety)."
  },
  {
    id: "unit_econ",
    category: "econ",
    question: "Unit Economics Stress Test",
    scenario: "Your AI Customer Service Chatbot costs $20/month per user (subscription). Users average 50 messages/day. Each message averages 1k input tokens and 500 output tokens. Input cost is $5/1M, Output is $15/1M. Is this viable? If not, how do you fix it technically?",
    rubric: "Level 1: No math, just guesses. Level 3: Calculates basic cost, realizes it's expensive. Level 5: Calculates negative margin (~$18.75/mo cost is too close to $20 rev), suggests Model Routing (small models for easy queries), Prompt Caching, or Outcome-based pricing."
  },
  {
    id: "ethics_hallucination",
    category: "prob",
    question: "Handling Hallucinations",
    scenario: "During testing, your medical bot invented a fake drug name 'CureX-500'. Your engineers say 'we just need a better system prompt'. How do you respond?",
    rubric: "Level 1: Agrees to just change prompt. Level 3: Suggests better prompting + temperature 0. Level 5: Demands Engineering implementations: Self-consistency checks, Grounding scores (checking output against source context), and hard Guardrails."
  }
];

// --- EXTENSIVE SKILL TREE DATA ---
export const SKILL_TREE_DATA: SkillNode[] = [
  // 1. Technical Fluency
  {
    id: "dim_tech",
    label: "Technical Fluency",
    description: "Understanding the engine.",
    category: "tech",
    children: [
      { 
        id: "transformer", 
        label: "Transformer Architecture", 
        description: "Self-Attention, Encoder-Decoder.", 
        category: "tech",
        eli5: "Imagine a group of people at a party. 'Self-Attention' is how much you focus on each person while they are talking to understand the full story.",
        practicalConnection: "Helps you communicate with researchers. Knowing why 'Attention is Quadratic' helps you justify why long-context features take longer to build or cost more.",
        talkingPoints: [
            "The quadratic complexity of self-attention limits context window size.",
            "Difference between Encoder-only (BERT) and Decoder-only (GPT) architectures.",
            "Why 'Attention is All You Need' changed NLP forever."
        ],
        videoSearchQuery: "transformer architecture explained simple",
        importance: "critical"
      },
      { 
        id: "tokens", 
        label: "Tokenization", 
        description: "BPE, Token limits.", 
        category: "tech",
        eli5: "Computers don't read words; they break them into little Lego bricks called Tokens. You pay for the bricks, not the words.",
        practicalConnection: "Directly affects your pricing model and UI constraints. Understanding token limits helps you design better 'summarization' triggers.",
        talkingPoints: [
            "Byte Pair Encoding (BPE) efficiency varies by language.",
            "Tokenization artifacts cause issues with math and spelling.",
            "1000 tokens ≈ 750 words."
        ],
        videoSearchQuery: "llm tokenization explained",
        importance: "critical"
      },
      { 
        id: "long_context", 
        label: "Long Context / Needle", 
        description: "Managing huge data inputs.", 
        category: "tech",
        eli5: "If the AI's whiteboard is huge, it can read a whole book. But it might still miss a single sentence written in the middle of page 400.",
        practicalConnection: "When a user says 'The AI missed this detail in my 200-page PDF', you'll know to investigate 'Lost in the Middle' issues rather than just 'retraining'.",
        talkingPoints: [
            "Needle In A Haystack (NIAH) benchmarks.",
            "Context Caching vs Prompt Compression.",
            "Recurrent vs Sliding Window attention."
        ],
        importance: "advanced"
      },
      { 
        id: "multimodal", 
        label: "Multimodal (Vision/Audio)", 
        description: "Beyond text interfaces.", 
        category: "tech",
        eli5: "The AI isn't just a writer anymore; it has eyes and ears. It can see a photo and describe it, or hear a voice and understand the emotion.",
        practicalConnection: "Crucial for expanding your product's accessibility and 'Natural UI' features. Opens doors for industries like retail or healthcare.",
        importance: "critical"
      }
    ]
  },

  // 2. Data Strategy
  {
    id: "dim_data",
    label: "Data Strategy",
    description: "Fueling the engine.",
    category: "data",
    children: [
      { 
        id: "rag", 
        label: "RAG (Retrieval)", 
        description: "Grounding models in facts.", 
        category: "data",
        eli5: "RAG is like letting the AI take an 'Open Book Test'. It looks up the answer in your specific data before answering.",
        practicalConnection: "The standard for enterprise AI. You will use this whenever your product needs to talk about private documents or real-time news.",
        importance: "critical"
      },
      { 
        id: "synthetic_data", 
        label: "Synthetic Data", 
        description: "AI-generated training data.", 
        category: "data",
        eli5: "If you don't have enough data to teach the AI, you use another AI to write a bunch of practice problems for it.",
        practicalConnection: "Solves the 'cold start' problem for new features where you lack real user data. Saves millions in data labeling costs.",
        importance: "advanced"
      },
      { 
        id: "data_curation", 
        label: "Data Curation / HITL", 
        description: "Human-in-the-loop loops.", 
        category: "data",
        eli5: "The AI is a student, and humans are the teachers who grade its work to help it improve faster.",
        practicalConnection: "You'll design the 'Thumbs Up/Down' UI and the internal dashboards used to improve the model over time.",
        importance: "critical"
      },
      { 
        id: "embeddings", 
        label: "Vector Embeddings", 
        description: "Semantic search.", 
        category: "data",
        eli5: "Embeddings turn words into GPS coordinates. 'King' and 'Queen' are close together; 'King' and 'Apple' are far apart.",
        practicalConnection: "The secret sauce behind recommendation engines and smart search. Knowing this helps you improve how users 'find' information.",
        importance: "critical"
      }
    ]
  },

  // 3. Probabilistic Thinking
  {
    id: "dim_prob",
    label: "Probabilistic Thinking",
    description: "Managing uncertainty.",
    category: "prob",
    children: [
      { 
        id: "temperature", 
        label: "Temperature / Top-P", 
        description: "The creativity dial.", 
        category: "prob",
        eli5: "The 'Craziness Knob'. Low means a strict accountant; high means a wild poet.",
        practicalConnection: "You'll set this based on user persona. High for 'Brainstorming' tools, Low for 'Code Generation' or 'Data Entry'.",
        importance: "critical"
      },
      { 
        id: "llm_judge", 
        label: "LLM-as-a-Judge", 
        description: "Automated qualitative evals.", 
        category: "prob",
        eli5: "Using a very smart AI (like GPT-4) to grade a faster, cheaper AI's answers.",
        practicalConnection: "Allows you to measure 'Tone' and 'Helpfulness' at scale without hiring thousands of human testers.",
        importance: "critical"
      },
      { 
        id: "reflection", 
        label: "Self-Correction / Reflection", 
        description: "AI checking its own work.", 
        category: "prob",
        eli5: "Asking the AI: 'Are you sure about that?' before it shows the answer to the user.",
        practicalConnection: "Crucial for reducing hallucinations in high-stakes products (like legal or finance assistants).",
        importance: "advanced"
      },
      { 
        id: "evals_code", 
        label: "Evals-as-Code", 
        description: "CI/CD for AI behavior.", 
        category: "prob",
        eli5: "Treating the AI's 'Brain Test' like a software update. If it fails the test, we don't release it.",
        practicalConnection: "Ensures you don't break old features when you update the model or prompt. Sleep better on launch days.",
        importance: "advanced"
      }
    ]
  },

  // 4. AI Economics
  {
    id: "dim_econ",
    label: "AI Economics",
    description: "The business case.",
    category: "econ",
    children: [
      { 
        id: "tokenomics", 
        label: "Token Costs", 
        description: "Input vs Output pricing.", 
        category: "econ",
        eli5: "Reading is cheap. Writing is expensive. It costs more for the AI to write a book than to read one.",
        practicalConnection: "The foundation of your pricing strategy. Helps you decide between 'Freemium' and 'Usage-based' models.",
        importance: "critical"
      },
      { 
        id: "model_routing", 
        label: "Model Routing", 
        description: "Small vs Large model dispatch.", 
        category: "econ",
        eli5: "Don't hire a PhD Scientist to tie your shoes. Use a cheap intern (small model) for easy tasks.",
        practicalConnection: "A key lever for improving profit margins. You'll work with devs to set 'rules' for which model handles which query.",
        importance: "advanced"
      },
      { 
        id: "gpu_orch", 
        label: "GPU Orchestration", 
        description: "Supply & Demand of compute.", 
        category: "econ",
        eli5: "Managing the line at the amusement park. If the line is too long, we need to buy more seats (GPUs).",
        practicalConnection: "Helps you understand why your product crashes during peak hours and how to plan for scaling.",
        importance: "niche"
      },
      { 
        id: "distillation", 
        label: "Model Distillation", 
        description: "Shrinking huge brains.", 
        category: "econ",
        eli5: "Taking a giant encyclopedia and boiling it down into a tiny pocket guide that fits on your phone.",
        practicalConnection: "Essential for making AI fast and cheap. Use this when you need a feature to work 'instantly' for pennies.",
        importance: "advanced"
      }
    ]
  },

  // 5. Ethics & Safety
  {
    id: "dim_ethics",
    label: "Ethics & Safety",
    description: "Keeping it safe.",
    category: "ethics",
    children: [
      { 
        id: "hallucination", 
        label: "Hallucinations", 
        description: "Confident lies.", 
        category: "ethics",
        eli5: "The AI is a smooth talker. It hates saying 'I don't know', so sometimes it makes things up.",
        practicalConnection: "The #1 risk you'll manage. You must design 'fact-checking' UI features (like hover-over sources).",
        importance: "critical"
      },
      { 
        id: "jailbreaking", 
        label: "Jailbreaking / Red Teaming", 
        description: "Bypassing safety filters.", 
        category: "ethics",
        eli5: "People trying to trick the AI into doing something bad by speaking in code or playing pretend.",
        practicalConnection: "You'll run sessions to 'hack' your own product before bad guys do. Protects your brand reputation.",
        importance: "advanced"
      },
      { 
        id: "pii_masking", 
        label: "PII & Privacy", 
        description: "Protecting user data.", 
        category: "ethics",
        eli5: "Making sure the AI doesn't accidentally blurt out someone's phone number or credit card.",
        practicalConnection: "A legal requirement (GDPR/SOC2). You'll define which data is too sensitive to even send to the AI.",
        importance: "critical"
      }
    ]
  },

  // 6. AI UX & Tools
  {
    id: "dim_tools",
    label: "AI UX & Tools",
    description: "Designing the interaction.",
    category: "tools",
    children: [
      { 
        id: "vibe_coding", 
        label: "Vibe Coding (Cursor)", 
        description: "AI-native development.", 
        category: "tools",
        eli5: "Instead of typing code, you just tell the computer the 'vibe' of the feature you want, and it builds it.",
        practicalConnection: "Allows you to prototype features in HOURS instead of weeks. You can show stakeholders a working demo before Engineering even starts.",
        importance: "critical"
      },
      { 
        id: "artifacts", 
        label: "Generative UI (Artifacts)", 
        description: "Live interactive responses.", 
        category: "tools",
        eli5: "The AI doesn't just talk; it builds a whole mini-app or dashboard for you right in the chat.",
        practicalConnection: "The future of AI software. You'll decide when to show 'text' vs 'an interactive chart' vs 'a full document'.",
        importance: "advanced"
      },
      { 
        id: "langgraph", 
        label: "LangGraph / Agents", 
        description: "Complex multi-step loops.", 
        category: "tools",
        eli5: "Building a tiny office of AI workers who talk to each other to finish a big project.",
        practicalConnection: "Used for complex workflows (like 'Write a blog post, fact-check it, then post to Twitter'). You'll define the 'workflow' steps.",
        importance: "advanced"
      },
      { 
        id: "promptfoo", 
        label: "Promptfoo (Evals)", 
        description: "Testing prompts systematically.", 
        category: "tools",
        eli5: "A special machine that runs your prompt 100 times to see if it's actually working or if you just got lucky once.",
        practicalConnection: "The tool you'll use to prove to your boss that 'Yes, this prompt is ready for production'.",
        importance: "critical"
      }
    ]
  }
];

export const WEEKLY_QUIZZES: Record<number, WeeklyQuiz> = {
  1: {
    weekId: 1,
    questions: [
      {
        id: "w1q1",
        question: "Why does the 'Attention Mechanism' in Transformers lead to high computational cost for long contexts?",
        options: [
          "Because it processes tokens sequentially one by one.",
          "Because it calculates relationships between every token and every other token (Quadratic complexity).",
          "Because it requires massive hard drive storage.",
          "Because it only runs on CPUs."
        ],
        correctIndex: 1,
        explanation: "Self-attention requires an N^2 matrix of calculations, meaning doubling the context length quadruples the compute required."
      },
      {
        id: "w1q2",
        question: "What is the primary purpose of 'Pre-training' a Large Language Model?",
        options: [
          "To teach it how to follow specific user instructions.",
          "To eliminate all hallucinations.",
          "To teach it a statistical understanding of language and general world knowledge.",
          "To connect it to the internet for real-time data."
        ],
        correctIndex: 2,
        explanation: "Pre-training compresses internet-scale data into the model weights, giving it general knowledge. Instruction following comes later (SFT)."
      },
      {
        id: "w1q3",
        question: "In the context of LLMs, what is a 'Token'?",
        options: [
          "Always exactly one word.",
          "A unit of text (word, part of word, or character) used for processing.",
          "A cryptocurrency used to pay for the API.",
          "A security key."
        ],
        correctIndex: 1,
        explanation: "Tokens are the atoms of LLMs. 1000 tokens is roughly 750 words."
      }
    ]
  },
  2: {
    weekId: 2,
    questions: [
      {
        id: "w2q1",
        question: "What is 'Chain-of-Thought' (CoT) prompting?",
        options: [
          "Repeating the same prompt multiple times.",
          "Asking the model to 'think step-by-step' before giving a final answer.",
          "Chaining multiple API calls together.",
          "Using a blockchain to store prompts."
        ],
        correctIndex: 1,
        explanation: "CoT encourages the model to generate intermediate reasoning steps, which significantly improves performance on logic and math tasks."
      },
      {
        id: "w2q2",
        question: "What is the main benefit of 'Few-Shot' prompting?",
        options: [
          "It saves money on tokens.",
          "It forces the model to use a specific output format or style by providing examples.",
          "It makes the model run faster.",
          "It allows the model to access the internet."
        ],
        correctIndex: 1,
        explanation: "By providing 3-5 examples (shots) of Input->Output, you condition the model to follow that specific pattern without fine-tuning."
      },
      {
        id: "w2q3",
        question: "What does 'Temperature' control in LLM generation?",
        options: [
          "The speed of generation.",
          "The heat of the GPU.",
          "The randomness/creativity of the next token selection.",
          "The maximum length of the response."
        ],
        correctIndex: 2,
        explanation: "Lower temperature (0.0) makes the model deterministic and focused. Higher temperature (0.8+) makes it more random and creative."
      }
    ]
  },
  3: {
    weekId: 3,
    questions: [
      {
        id: "w3q1",
        question: "When should you prefer RAG (Retrieval Augmented Generation) over Fine-tuning?",
        options: [
          "When you need to change the model's speaking style.",
          "When you need the model to know about private, frequently changing data.",
          "When you want to reduce latency.",
          "When you have no budget for a database."
        ],
        correctIndex: 1,
        explanation: "RAG is for knowledge injection (especially dynamic/private data). Fine-tuning is better for behavior/style adaptation."
      },
      {
        id: "w3q2",
        question: "What is a 'Vector Embedding'?",
        options: [
          "A compressed zip file of text.",
          "A list of keywords.",
          "A numerical representation of text meaning in high-dimensional space.",
          "A URL link to a source."
        ],
        correctIndex: 2,
        explanation: "Embeddings turn text into number arrays where similar concepts are mathematically close to each other."
      },
      {
        id: "w3q3",
        question: "What is a common issue with 'Naive RAG' (just retrieving the top 3 chunks)?",
        options: [
          "It's too expensive.",
          "The retrieved chunks might miss the context window.",
          "The 'Lost in the Middle' phenomenon or retrieving irrelevant but keyword-heavy chunks.",
          "The model refuses to read them."
        ],
        correctIndex: 2,
        explanation: "Simple semantic search can fail on nuance. Advanced RAG uses re-ranking, hybrid search, and metadata filtering to fix this."
      }
    ]
  },
  5: {
    weekId: 5,
    questions: [
      {
        id: "w5q1",
        question: "In most LLM APIs (like GPT-4), how does Input cost compare to Output cost?",
        options: [
          "Input is more expensive than Output.",
          "They are the same price.",
          "Output is significantly (3x-10x) more expensive than Input.",
          "Input is free."
        ],
        correctIndex: 2,
        explanation: "Generation (Output) is compute-bound and serial, making it much more expensive than processing Input (parallelizable)."
      },
      {
        id: "w5q2",
        question: "If your user retention is low, but token usage per user is high, what risk do you face with Flat-rate Pricing?",
        options: [
          "No risk, you are making money.",
          "Negative Unit Economics (Power users cost more than they pay).",
          "Server crashes.",
          "Context window overflow."
        ],
        correctIndex: 1,
        explanation: "Flat subscriptions fail if users generate more cost in tokens than their monthly fee covers. Usage-based or hybrid pricing mitigates this."
      },
      {
        id: "w5q3",
        question: "What is 'Model Routing'?",
        options: [
          "Sending data between different regions.",
          "Dynamically sending simple queries to cheaper models and complex ones to smarter models.",
          "Training a model to route internet traffic.",
          "Using a router to improve wifi for AI."
        ],
        correctIndex: 1,
        explanation: "This is a key cost-saving strategy. Don't use GPT-4 for a 'Hello' message."
      }
    ]
  }
};
