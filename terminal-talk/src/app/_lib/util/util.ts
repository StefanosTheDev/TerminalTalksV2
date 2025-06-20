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
