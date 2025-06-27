import { fetchRecipes } from '@/lib/api'
import Link from 'next/link'
import Image from 'next/image'

// Define Recipe type
interface Recipe {
  id: number
  name: string
  image: string
  rating: number
  difficulty: string
  cuisine: string
}

export default async function HomePage() {
  const { recipes } = await fetchRecipes(3, 0) // top 3 for preview

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          🍳 Welcome to Recipe Explorer
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover delicious recipes from around the world. Fast, easy, and tasty.
        </p>
        <Link
          href="/recipes"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Browse Recipes
        </Link>
      </section>

      {/* Sample Cards Preview */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe: Recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className="block rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
            >
              <div
                className="h-48 bg-cover bg-center"
              >
                <Image src={recipe.image} alt={recipe.name} width={400} height={192} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
                  {recipe.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Cuisine: {recipe.cuisine} | Difficulty: {recipe.difficulty}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12">
        Made by <span className="font-medium text-blue-600">[Rahul Kumar]</span> &middot;{' '}
        <Link href="/recipes" className="underline">
          Explore More
        </Link>
      </footer>
    </main>
  )
}
