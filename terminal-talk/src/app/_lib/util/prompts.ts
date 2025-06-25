export interface LectureInput {
  title: string;
  topic: string;
  text: string;
  language: string;
}

export function createBeginnerSystemPrompt(): string {
  return `You are an expert technical educator creating 5-minute audio lectures for beginner programmers.

BEGINNER FOCUS:
- Assume zero to minimal programming knowledge
- Define ALL technical terms simply
- Use real-world analogies and comparisons
- Encouraging, supportive tone
- Explain the "why" before the "how"

AUDIO RULES:
- NEVER write literal code syntax (no "function App() {}" or "const x = 5")
- Explain concepts conversationally: "You'd create a function that takes two parameters"
- Use [PAUSE] markers for emphasis and clarity
- Write like you're explaining to a friend who's whos new to coding.

5-MINUTE STRUCTURE:
1. Hook (30 seconds): Why this topic matters to beginners
2. Main Explanation (4 minutes): Core concept with simple analogies
3. Wrap-up (30 seconds): One key takeaway and encouragement

WORD COUNT: Keep it 600-750 words total (exactly 5 minutes when spoken).

Make it conversational and perfect for text-to-speech.`;
}

export function createBeginnerUserPrompt({
  title,
  topic,
  text,
  language,
  level,
}: {
  title: string;
  topic: string;
  text: string;
  language: string;
  level: string;
}): string {
  return `Create a 5-minute beginner programming lecture:

Title: ${title}
Topic: ${topic}
Language: ${language}

Content to Cover:
${text}

Requirements:
- Perfect for someone who's never programmed before
- Use simple analogies and define technical terms
- Include [PAUSE] markers for clarity
- Keep it exactly 5 minutes (600-750 words)
- End with encouragement and one actionable next step

Generate a complete lecture script that sounds natural when spoken aloud.`;
}

export function createIntermediateSystemPrompt(): string {
  return `You are a Senior JavaScript Developer and master of all frameworks creating 5-minute audio lectures for intermediate programmers.

INTERMEDIATE FOCUS:
- Assume 2-3 years of software engineering experience
- Target developers familiar with basic concepts but seeking deeper understanding
- Focus on "when and why" over "what" - they know the basics
- Compare approaches and trade-offs between different solutions
- Reference real-world scenarios and production considerations
- Bridge the gap between knowing syntax and making architectural decisions

SENIOR DEVELOPER EXPERTISE:
- Draw from deep knowledge of JavaScript ecosystem and all major frameworks
- Reference official documentation patterns and best practices
- Explain the reasoning behind framework design decisions
- Compare competing solutions (React vs Vue, REST vs GraphQL, etc.)
- Share insights about performance, maintainability, and scalability

AUDIO RULES:
- NEVER write literal code syntax (no "function App() {}" or "const x = 5")
- Explain patterns conversationally: "You'd destructure the props and map over the array"
- Use [PAUSE] markers for emphasis and complex concept transitions
- Reference documentation and real codebases they've likely seen

5-MINUTE STRUCTURE:
1. Hook (30 seconds): Why this matters for their career growth and daily work
2. Main Explanation (4 minutes): Deep dive with practical context and decision frameworks
3. Wrap-up (30 seconds): Actionable insight they can apply immediately

WORD COUNT: Keep it 600-750 words total (exactly 5 minutes when spoken).

Make it conversational yet technically sophisticated - like a senior dev mentoring over coffee.`;
}
export function createIntermediateUserPrompt({
  title,
  topic,
  text,
  language,
  level,
}: {
  title: string;
  topic: string;
  text: string;
  language: string;
  level: string;
}): string {
  return `Create a 5-minute intermediate programming lecture:

Title: ${title}
Topic: ${topic}
Language: ${language}

Content to Cover:
${text}

Requirements:
- Perfect for developers with 2-3 years of experience
- Focus on when/why to use concepts, not just what they are
- Compare different approaches and explain trade-offs
- Include real-world production considerations
- Use [PAUSE] markers for complex transitions
- Keep it exactly 5 minutes (600-750 words)
- End with an actionable insight they can apply to their current projects

Generate a complete lecture script that bridges the gap between knowing syntax and making smart architectural decisions.`;
}
export function cleanText(inputText: string): string {
  if (!inputText) return 'Welcome to this technical lecture.';

  return (
    inputText
      // Remove SSML tags that cause 401 errors
      .replace(/<break time="[^"]*"\/>/g, ' ... ') // <break time="1s"/> -> ...
      .replace(/<break[^>]*>/g, ' ... ') // Any break tag -> ...
      .replace(/<[^>]*>/g, '') // Remove all HTML/XML tags

      // Remove markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '$1') // **bold** -> bold
      .replace(/\*([^*]+)\*/g, '$1') // *italic* -> italic

      // Clean structure markers
      .replace(/\*\*\[([^\]]+)\]\*\*/g, '$1: ') // **[Hook]** -> Hook:
      .replace(/\[([^\]]+)\]/g, '$1') // [text] -> text

      // Clean whitespace
      .replace(/\n+/g, ' ') // Multiple newlines -> space
      .replace(/\s+/g, ' ') // Multiple spaces -> single space
      .trim() // Remove start/end whitespace

      // Ensure proper ending
      .replace(/[.!?]\s*$/, '') + '.'
  ); // Make sure it ends with period
}