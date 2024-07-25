import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import CourseDetails from "@/components/CourseDetails";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { submitStudentInfo } from "@/services";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const phoneRegex =
  /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/;

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "First name is required.",
    })
    .max(35, {
      message: "First name can't be more than 35 characters.",
    }),
  lastName: z
    .string()
    .min(1, {
      message: "Last name is required.",
    })
    .max(35, {
      message: "Last name can't be more than 35 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Email is invalid"),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .max(15, { message: "Phone number is too long" })
    .regex(phoneRegex, {
      message: "Wrong phone number format. Please enter a correct phone number",
    }),
});

export const CourseForm = () => {
  const { id: courseId } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const data = { ...values, courseId: courseId ?? "" };
      const response = await submitStudentInfo(data);
      console.log("Form submitted successfully:", response);

      // Store the data in local storage
      localStorage.setItem("submittedForm", JSON.stringify(response));

      toast({
        title: "Form successfully submitted!",
      });

      // Clear the form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Please try again later, and if issue still persist please contact the support",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <CourseDetails />
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Enter your details</CardTitle>
            <CardDescription>Fill in the form</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Please enter a valid phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {!loading && 'Submit'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};
