import { fetchRecipes } from '@/lib/api'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Define Recipe type
interface Recipe {
  id: number
  name: string
  image: string
  rating: number
  difficulty: string
  cuisine: string
  prepTimeMinutes?: number
  ingredients: string[]
  instructions: string[]
}

async function getPostOr404(id: string) {
  const data = await fetchRecipes(100, 0);
  const recipe = data.recipes.find((recipe: Recipe) => recipe.id === Number(id));
  if (!recipe) notFound();
  return recipe;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const recipe = await getPostOr404(params.id);
  return {
    title: recipe.name,
    description: recipe.cuisine,
  }
}

export async function generateStaticParams() {
  const data = await fetchRecipes(100, 0);
  return data.recipes.map((recipe: Recipe) => ({
    id: recipe.id.toString(),
  }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await getPostOr404(params.id);

  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      <Link href="/recipes" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Recipes
      </Link>

      <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>

      <div className="text-600 mb-6">
        <span className="mr-4">🍽️ <strong>Cuisine:</strong> {recipe.cuisine}</span>
        <span className="mr-4">⚙️ <strong>Difficulty:</strong> {recipe.difficulty}</span>
        <span>⏱️ <strong>Prep Time:</strong> {recipe.prepTimeMinutes} mins</span>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-800">
          {recipe.ingredients.map((ingredient: string, i: number) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-800 space-y-2">
          {recipe.instructions.map((step: string, i: number) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  )
}
