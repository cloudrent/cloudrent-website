import { createClient } from '@supabase/supabase-js'

// Support both naming conventions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for support docs
export interface DocCategory {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string
  color: string
  sort_order: number
}

export interface SupportDoc {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  category_id: string | null
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  sort_order: number
  related_screens: string[]
  featured_image: string | null
  video_url: string | null
  view_count: number
  helpful_count: number
  not_helpful_count: number
  created_at: string
  updated_at: string
  published_at: string | null
  category?: DocCategory
}

// Fetch all published docs
export async function getPublishedDocs(): Promise<SupportDoc[]> {
  const { data, error } = await supabase
    .from('support_docs')
    .select(`
      *,
      doc_categories (
        id,
        name,
        slug,
        description,
        icon,
        color,
        sort_order
      )
    `)
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('title', { ascending: true })

  if (error) {
    console.error('Error fetching docs:', error)
    return []
  }

  return (data || []).map((doc: any) => ({
    ...doc,
    category: doc.doc_categories || null,
  }))
}

// Fetch docs by category
export async function getDocsByCategory(categorySlug: string): Promise<SupportDoc[]> {
  const { data, error } = await supabase
    .from('support_docs')
    .select(`
      *,
      doc_categories!inner (
        id,
        name,
        slug,
        description,
        icon,
        color,
        sort_order
      )
    `)
    .eq('status', 'published')
    .eq('doc_categories.slug', categorySlug)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching docs by category:', error)
    return []
  }

  return (data || []).map((doc: any) => ({
    ...doc,
    category: doc.doc_categories || null,
  }))
}

// Fetch single doc by slug
export async function getDocBySlug(slug: string): Promise<SupportDoc | null> {
  const { data, error } = await supabase
    .from('support_docs')
    .select(`
      *,
      doc_categories (
        id,
        name,
        slug,
        description,
        icon,
        color,
        sort_order
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching doc:', error)
    return null
  }

  return {
    ...data,
    category: data.doc_categories || null,
  }
}

// Fetch all categories
export async function getCategories(): Promise<DocCategory[]> {
  const { data, error } = await supabase
    .from('doc_categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data || []
}

// Increment view count
export async function incrementViewCount(docId: string): Promise<void> {
  await supabase.rpc('increment_doc_view', { doc_id: docId })
}

// Search docs
export async function searchDocs(query: string): Promise<SupportDoc[]> {
  const { data, error } = await supabase
    .from('support_docs')
    .select(`
      *,
      doc_categories (
        id,
        name,
        slug,
        description,
        icon,
        color,
        sort_order
      )
    `)
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .limit(20)

  if (error) {
    console.error('Error searching docs:', error)
    return []
  }

  return (data || []).map((doc: any) => ({
    ...doc,
    category: doc.doc_categories || null,
  }))
}

// Record feedback
export async function recordFeedback(docId: string, helpful: boolean): Promise<void> {
  const column = helpful ? 'helpful_count' : 'not_helpful_count'

  await supabase
    .from('support_docs')
    .update({ [column]: supabase.rpc('increment', { row_id: docId, column_name: column }) })
    .eq('id', docId)
}
