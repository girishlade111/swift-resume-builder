/**
 * AtsTips — small callout box with resume writing tips.
 */
import { Lightbulb } from 'lucide-react';

export default function AtsTips({ tips }: { tips: string[] }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
      <div className="mb-1.5 flex items-center gap-1.5 font-medium text-primary">
        <Lightbulb className="h-3.5 w-3.5" />
        ATS Tips
      </div>
      <ul className="ml-4 list-disc space-y-0.5">
        {tips.map((tip, i) => <li key={i}>{tip}</li>)}
      </ul>
    </div>
  );
}
