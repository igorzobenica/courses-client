import React, { useState, useEffect } from "react";
import { fetchCourses } from "../services";
import { Input } from "./ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses(searchQuery);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    getCourses();
  }, [searchQuery]);

  return (
    <div className="m-8">
      <Label htmlFor="search">Search courses</Label>
      <Input
        id="search"
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mt-1 mb-4"
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <li key={course.id}>
            <Card className="">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.instituteName}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div>
                  <span className="text-xs">Category: </span>
                  <span className="text-xs">{course.category}</span>
                </div>
                <div>
                  <span className="text-xs">Location: </span>
                  <span className="text-xs">{course.location}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button asChild>
                  <Link to={`/courses/${course.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CourseList;
