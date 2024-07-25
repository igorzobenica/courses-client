import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Badge } from "./ui/Badge";
import { dateString } from "@/lib/utils";
import { Skeleton } from "./ui/Skeleton";

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await fetchCourseById(id!);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourse();
  }, [id]);

  if (loading)
    return (
      <Card className="">
        <CardHeader>
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div>
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <div>
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-4 w-[200px]" />
        </CardFooter>
      </Card>
    );

  if (!course) return <p>Course not found</p>;

  return (
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
        <Badge
          variant={
            new Date(course.startDate) > new Date() ? "default" : "secondary"
          }
        >
          <time className="text-xs font-medium">
            {dateString(course.startDate)}
          </time>
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default CourseDetail;
