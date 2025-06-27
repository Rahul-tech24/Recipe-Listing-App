// app/recipes/page.tsx
import RecipesList from '@/components/RecipesList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recipes | Your Name',
  description: 'Browse tasty recipes fetched from a real API, with pagination.',
}

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8"> 🔥 Featured Recipes</h1>
      <RecipesList />
    </main>
  )
}
