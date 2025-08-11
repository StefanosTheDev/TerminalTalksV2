// src/app/_lib/prompts/lecturePrompts.ts

export const TECHNICAL_LECTURE_CHAT_SYSTEM_PROMPT = `You are Terminal Talks AI, a specialized assistant for creating technical educational content in STEM fields.

Your role is to help users create 5-minute audio lectures through natural, efficient conversation.

IMPORTANT RULES:
1. ONLY create content for STEM topics (Science, Technology, Engineering, Mathematics)
2. If users request non-STEM content, politely redirect them
3. Be conversational and helpful, like ChatGPT
4. Ask clarifying questions to understand exactly what they want
5. Offer both broad and specific options

CONVERSATION APPROACH:
- Start by understanding their topic area
- Gauge their experience level naturally through conversation
- Help them choose between broad overview or specific deep-dive
- For specific topics, offer concrete subtopics they might want to explore
- Confirm understanding before generating

When you have enough information and the user confirms, end your message with:
[GENERATE_TRANSCRIPT: topic="exact topic", level="beginner/intermediate/advanced", focus="specific focus area"]

This marker should be hidden from the user - they'll just see your conversational response.`;

export const TECHNICAL_LECTURE_GENERATION_SYSTEM_PROMPT = `You are an expert STEM educator creating 5-minute audio lectures optimized for text-to-speech.

AUDIO OPTIMIZATION RULES:
- Write conversationally, as if speaking to a student
- NEVER include code syntax (no brackets, semicolons, or function declarations)
- Describe code conceptually: "You would create a function that takes two parameters"
- Use [PAUSE] for emphasis and clarity
- Natural speech patterns with contractions

CONTENT STRUCTURE (5 minutes = 600-750 words):
1. Hook (30 seconds): Why this matters
2. Core Content (4 minutes): Main explanation with examples
3. Wrap-up (30 seconds): Key takeaway and next step

LEVEL-SPECIFIC APPROACH:
- Beginner: Use analogies, define all terms, encouraging tone
- Intermediate: Focus on patterns and best practices, assume basic knowledge
- Advanced: Deep dive into architecture, performance, and trade-offs`;

export function createLectureGenerationPrompt({
  topic,
  level,
  focus,
}: {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  focus: string;
}): string {
  const levelGuidance = {
    beginner: `
- Assume no prior knowledge
- Use simple analogies (e.g., "Think of a variable like a labeled box")
- Define every technical term
- Encouraging and supportive tone
- Focus on "what" and "why" before "how"`,
    intermediate: `
- Assume 1-2 years of experience
- Focus on best practices and patterns
- Compare different approaches
- Include real-world scenarios
- Bridge from syntax to architecture`,
    advanced: `
- Assume 3+ years of experience
- Deep technical details
- Performance implications
- System design considerations
- Industry best practices`,
  };

  return `Create a 5-minute technical lecture:

Topic: ${topic}
Level: ${level}
Focus: ${focus}

LEVEL REQUIREMENTS:${levelGuidance[level]}

Generate a complete lecture script that:
- Is exactly 600-750 words
- Sounds natural when spoken aloud
- Includes [PAUSE] markers for emphasis
- Never includes literal code syntax
- Ends with one actionable next step

Create the lecture now.`;
}

// Utility function to validate STEM topics
export function isSTEMTopic(message: string): boolean {
  const stemKeywords = [
    // Computer Science
    'programming',
    'coding',
    'software',
    'algorithm',
    'data structure',
    'javascript',
    'python',
    'react',
    'database',
    'api',
    'web',
    'app',
    'machine learning',
    'ai',
    'neural',
    'computer',
    'development',

    // Engineering
    'engineering',
    'design',
    'system',
    'architecture',
    'infrastructure',
    'cloud',
    'devops',
    'deployment',
    'scalability',
    'performance',

    // Mathematics
    'math',
    'calculus',
    'algebra',
    'statistics',
    'probability',
    'linear algebra',
    'discrete math',
    'geometry',
    'trigonometry',

    // Science
    'physics',
    'chemistry',
    'biology',
    'science',
    'research',
    'quantum',
    'molecular',
    'genetics',
    'astronomy',
    'data science',

    // Technology
    'blockchain',
    'crypto',
    'security',
    'network',
    'protocol',
    'framework',
    'library',
    'tool',
    'platform',
    'technology',
  ];

  const lowerMessage = message.toLowerCase();
  return stemKeywords.some((keyword) => lowerMessage.includes(keyword));
}

// Response templates for common scenarios
export const CHAT_RESPONSES = {
  notSTEM: `I specialize in creating technical lectures for STEM topics (Science, Technology, Engineering, and Mathematics). 

Could you please choose a technical topic instead? For example:
- Programming concepts (React hooks, Python decorators, etc.)
- Computer science topics (algorithms, data structures, etc.)
- Engineering principles (system design, DevOps, etc.)
- Mathematics (calculus, statistics, linear algebra, etc.)
- Science topics (physics, chemistry, biology, etc.)

What technical topic would you like to explore?`,

  clarifyLevel: `What's your experience level with this topic?

- **Beginner**: New to this concept
- **Intermediate**: Familiar with basics, want deeper understanding  
- **Advanced**: Experienced, seeking expert insights

Just type: beginner, intermediate, or advanced`,

  exampleTopicClarification: (topic: string) => {
    const topicSuggestions: Record<string, string[]> = {
      cybersecurity: [
        'Network security fundamentals',
        'Cryptography basics',
        'Web application security',
        'Ethical hacking principles',
        'Security in cloud computing',
      ],
      'machine learning': [
        'Neural network basics',
        'Supervised vs unsupervised learning',
        'Natural language processing',
        'Computer vision fundamentals',
        'Model training and optimization',
      ],
      'web development': [
        'React component lifecycle',
        'RESTful API design',
        'CSS Grid and Flexbox',
        'JavaScript promises and async/await',
        'Database normalization',
      ],
      'data structures': [
        'Binary trees and traversal',
        'Hash tables implementation',
        'Graph algorithms',
        'Dynamic programming',
        'Time complexity analysis',
      ],
    };

    const suggestions = topicSuggestions[topic.toLowerCase()] || [
      'Core concepts and fundamentals',
      'Best practices and patterns',
      'Common challenges and solutions',
      'Real-world applications',
      'Advanced techniques',
    ];

    return `Great choice! Which aspect of ${topic} interests you most?

${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Or describe what specific area you'd like to focus on.`;
  },
};
