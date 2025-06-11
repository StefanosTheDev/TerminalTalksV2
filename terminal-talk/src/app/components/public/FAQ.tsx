export default function FAQ() {
  return (
    <section id="faq" className=" text-black py-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-center font-bold text-4xl md:text-5xl tracking-wide mb-12">
          FAQ
        </h2>

        {/* List */}
        <ul className="divide-y divide-gray-700">
          {[
            'What is text to speech (TTS)?',
            'What is an AI voice?',
            'How can I use Speechify?',
            'Who is text to speech software for?',
            'Do Speechify voices sound natural?',
            'What is voice cloning? Does Speechify have it?',
            'Does Speechify have an AI Voice API or TTS API?',
            'Are there special plans available to schools or teams?',
          ].map((q) => (
            <li key={q} className="flex items-center justify-between py-6">
              <span className="text-lg md:text-xl">{q}</span>
              {/* placeholder toggle icon */}
              <span className="text-2xl leading-none select-none">+</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
