import { redirect } from 'next/navigation'

// Redirect /blog to /posts for SEO compatibility with WordPress
export default function BlogRedirect() {
  redirect('/posts')
}
