"use client";
import BlogPost from '@/components/BlogPost'
import { useParams } from 'next/navigation';

const BlogPage = () => {
    const { id } = useParams();
  return (
    <div >
        <BlogPost id={Array.isArray(id) ? id[0] : id || ""} />
    </div>
  )
}

export default BlogPage