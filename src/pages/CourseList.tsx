import React, { useState, useEffect } from "react";
import { fetchCourses } from "../services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/Pagination";
import { Badge } from "../components/ui/Badge";
import { dateString } from "@/lib/utils";
import { Skeleton } from "../components/ui/Skeleton";
import Filters from "../components/Filters";
import useDebounce from "@/hooks/useDebounce";
import Layout from "../components/Layout";
import { Course } from "@/src/types";

const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
};

const getPaginationRange = (page: number, totalPages: number) => {
  const start = Math.floor((page - 1) / 3) * 3 + 1;
  const end = Math.min(start + 2, totalPages);
  const range = [];

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
};

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [courseLocation, setCourseLocation] = useState("");
  const [language, setLanguage] = useState<string | undefined>();
  const [startDate, setStartDate] = React.useState<Date>();

  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(params.get("page") || "1", 10);
    setPage(pageFromUrl);
  }, [location.search]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses({
          searchQuery: debouncedSearchQuery,
          page,
          category,
          location: courseLocation,
          deliveryMethod,
          language,
          startDate,
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
  }, [
    debouncedSearchQuery,
    page,
    category,
    courseLocation,
    deliveryMethod,
    language,
    startDate,
  ]);

  const handlePageChange = (pageNumber: number) => {
    navigate(`/courses/?page=${pageNumber}`);
    setPage(pageNumber);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const paginationRange = getPaginationRange(page, totalPages);

  const showPaginationEllipsis = totalPages > 3 && page + 2 < totalPages;

  return (
    <Layout>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Course List
      </h2>
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
          language={language}
          setLanguage={setLanguage}
          startDate={startDate}
          setStartDate={setStartDate}
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
            courses.length > 0 &&
            courses.map((course) => (
              <li key={course.id}>
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>
                      {highlightText(course.name, debouncedSearchQuery)}
                    </CardTitle>
                    <CardDescription>
                      {highlightText(
                        course.instituteName,
                        debouncedSearchQuery
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
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
                          <span className="text-xs font-medium">
                            Language:{" "}
                          </span>
                          <Badge variant="outline">{course.language}</Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Badge
                      variant={
                        new Date(course.startDate) > new Date()
                          ? "default"
                          : "secondary"
                      }
                    >
                      <time className="text-xs font-medium">
                        {dateString(course.startDate)}
                      </time>
                    </Badge>
                    <Button asChild>
                      <Link to={`/courses/${course.id}`}>Select</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
        </ul>
        {!loading && courses.length === 0 && (
          <div className="flex flex-col justify-center items-center w-full h-24">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              No courses found
            </h4>
            <p className="text-sm">Please adjust the search</p>
          </div>
        )}
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
    </Layout>
  );
};

export default CourseList;
