export default function InstructionList({ instructions }: { instructions: string[] }) {
  return (
    <ol className="list-decimal list-inside space-y-3 bg-base-100 p-6 rounded-xl border border-base-200">
      {instructions.map((step, idx) => (
        <li key={idx} className="text-sm leading-relaxed">
          {step}
        </li>
      ))}
    </ol>
  );
}