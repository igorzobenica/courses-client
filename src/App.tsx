import CourseList from "./components/CourseList";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Course List
      </h2>
      <CourseList />
    </Layout>
  );
}

export default App;
