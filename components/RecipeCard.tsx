import Link from "next/link"

type RecipeCardProps = {
   recipe: {
    id: number
    name: string
    image: string
    rating: number
    difficulty: string
    cuisine: string}
  }
  
export default function RecipeCard({ recipe }: RecipeCardProps ) {
      return (
          <Link href={`/recipes/${recipe.id}`} >
              <div className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-800">
        <img src={recipe.image} alt={recipe.name} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{recipe.name}</h3>
          <p className="text-sm text-gray-500">{recipe.cuisine} • {recipe.difficulty}</p>
          <p className="text-yellow-500 text-sm mt-2">⭐ {recipe.rating}</p>
        </div>
      </div>
          </Link>
      
    )
}