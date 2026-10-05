import { Star } from "lucide-react";

export default function Stars({ rating = 5, size = 16, label, className = "" }: { rating?: number; size?: number; label?: string; className?: string }) {
  return (
    <span role="img" aria-label={label ?? `${rating} out of 5 stars`} className={`flex gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill="currentColor" className={i <= rating ? "text-brand" : "text-[#DDDDDD]"} />
      ))}
    </span>
  );
}
