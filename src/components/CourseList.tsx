import React, { useState, useEffect } from "react";
import { fetchCourses } from "../services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Button } from "./ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination";
import { Badge } from "./ui/Badge";
import { dateString } from "@/lib/utils";
import { Skeleton } from "./ui/Skeleton";
import Filters from "./Filters";

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [courseLocation, setCourseLocation] = useState("");

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(params.get("page") || "1", 10);
    setPage(pageFromUrl);
  }, [location.search]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses({
          searchQuery,
          page,
          category,
          location: courseLocation,
          deliveryMethod,
        });
        setCourses(data.courses);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [searchQuery, page, category, courseLocation, deliveryMethod]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`/?page=${pageNumber}`);
    setPage(pageNumber);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const getPaginationRange = () => {
    const start = Math.floor((page - 1) / 3) * 3 + 1;
    const end = Math.min(start + 2, totalPages);
    const range = [];

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  const showPaginationEllipsis = totalPages > 3 && page + 2 < totalPages;

  return (
    <div className="relative">
      <Filters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        category={category}
        setCategory={setCategory}
        location={courseLocation}
        setCourseLocation={setCourseLocation}
        deliveryMethod={deliveryMethod}
        setDeliveryMethod={setDeliveryMethod}
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading &&
          [...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[10rem] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/4" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
          ))}
        {!loading &&
          courses.map((course) => (
            <li key={course.id}>
              <Card className="">
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.instituteName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div>
                      <span className="text-xs font-medium">Category: </span>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <div>
                      <span className="text-xs font-medium">Location: </span>
                      <Badge variant="outline">{course.location}</Badge>
                    </div>
                    {course.language && (
                      <div>
                        <span className="text-xs font-medium">Language: </span>
                        <Badge variant="outline">{course.language}</Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <time className="text-xs font-medium">
                    {dateString(course.startDate)}
                  </time>
                  <Button asChild>
                    <Link to={`/courses/${course.id}`}>Select</Link>
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
      </ul>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              className={`gap-1 pl-2.5 ${
                page <= 1 ? "pointer-events-none opacity-50" : ""
              }`}
            />
          </PaginationItem>
          {paginationRange.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                onClick={() => handlePageChange(pageNumber)}
                isActive={page === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {showPaginationEllipsis && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              className={`gap-1 pr-2.5 ${
                page >= totalPages ? "pointer-events-none opacity-50" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CourseList;
