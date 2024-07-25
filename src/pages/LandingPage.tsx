import React from "react";
import { Button } from "@/components/ui/Button";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[80vh] justify-center items-center text-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Welcome to Our Course Finder
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mt-4 text-center">
        Discover a wide range of courses to enhance your skills and knowledge.
        Whether you're looking for online or in-person classes, we have
        something for everyone. Explore our offerings and find the perfect
        course for you!
      </p>
      <Button
        className="mt-8"
        onClick={() => (window.location.href = "/courses")}
      >
        Explore Courses
      </Button>
    </div>
  );
};

export default LandingPage;
