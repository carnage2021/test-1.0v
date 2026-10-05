import type { Metadata } from "next";
import { Suspense } from "react";
import BookingFlow from "./BookingFlow";

export const metadata: Metadata = {
  title: "Choose your cab",
  robots: { index: false },
};

export default function BookingPage() {
  return (
    <Suspense fallback={<main id="main" className="wrap min-h-[70vh] pt-[92px]" />}>
      <BookingFlow />
    </Suspense>
  );
}
