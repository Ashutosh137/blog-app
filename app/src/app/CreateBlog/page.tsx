import CreateBlog from "@/Layout/Components/CreateBlog";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "CrateBlog || blogup",
  description: "build with blgup , share your stories",
};
function Page() {
  return <CreateBlog />;
}

export default Page;
