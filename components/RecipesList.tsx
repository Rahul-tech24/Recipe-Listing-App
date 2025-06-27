'use client'  

import { useState, useEffect } from 'react'
import { fetchRecipes } from '@/lib/api'
import RecipeCard from './RecipeCard'

interface Recipe {
  id: number
  name: string
  image: string
  rating: number
  difficulty: string
  cuisine: string
}

export default function RecipesList() {
  const LIMIT = 9

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)


  //  Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim())
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  //  Initial data fetch (pagination)
  useEffect(() => {
    async function load() {
      setIsLoading(true)
      setError(null)
      try {
        const { recipes: newRecipes, total } = await fetchRecipes(LIMIT, page * LIMIT)
        setRecipes(prev => [...prev, ...newRecipes])
        if ((page + 1) * LIMIT >= total) setHasMore(false)
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching recipes'
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }
    if (!debouncedTerm) load() // don't fetch paginated results if searching
  }, [page, debouncedTerm])

  //  Debounced search fetch
  useEffect(() => {
    async function search() {
      setIsSearching(true)
      if (!debouncedTerm) {
        setIsSearching(false)
        return
      }

      try {
        const { recipes: all } = await fetchRecipes(100, 0)
        const matched = all.filter((r: Recipe) =>
          r.name.toLowerCase().includes(debouncedTerm.toLowerCase())
        )
        // Note: matched is not used in current implementation, but keeping for potential future use
      } catch (err) {
        console.error('Search failed:', err)
      } finally {
        setIsSearching(false)
      }
    }

    search()
  }, [debouncedTerm]);

  //  Error block
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => setPage(0)} className="px-4 py-2 bg-blue-600 text-white rounded">
          Retry
        </button>
      </div>
    )
  }
    
  const filteredBySearch = debouncedTerm
    ? recipes.filter((r: Recipe) => r.name.toLowerCase().includes(debouncedTerm.toLowerCase()))
    : recipes

  const visibleRecipes = filteredBySearch.filter((r: Recipe) => {
    return (
      (!selectedCuisine || r.cuisine === selectedCuisine) &&
      (!selectedDifficulty || r.difficulty === selectedDifficulty)
    )
  })

  //  Empty state
  if (!visibleRecipes.length && !isLoading && !isSearching) {
    return (
      <div className="text-center py-12">
  <p className="text-gray-500">
    No recipes found for <span className="font-semibold">&quot;{debouncedTerm}&quot;</span>.
  </p>
  <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCuisine(null);
            setSelectedDifficulty(null);
    }}
    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Clear Search
  </button>
</div>
    )  }

  return (
    <>
      {/*  Search Input */}
      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border rounded shadow"
        />
      </div>

      {/*  Search Status */}
      {isSearching && (
        <p className="text-sm text-gray-500 animate-pulse mb-4">Searching recipes...</p>
      )}

<div className="flex gap-4 text-amber-400 mb-6 flex-wrap">
  <select value={selectedCuisine || ''} onChange={e => setSelectedCuisine(e.target.value || null)} className="px-3 py-2 border rounded">
    <option value="">All Cuisines</option>
    <option value="Indian">Indian</option>
    <option value="Italian">Italian</option>
    <option value="Mexican">Mexican</option>
  </select>

  <select value={selectedDifficulty || ''} onChange={e => setSelectedDifficulty(e.target.value || null)} className="px-3 py-2 border rounded">
    <option value="">All Difficulties</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
      </div>
      <button
  onClick={() => {
    setSearchTerm('')
    setSelectedCuisine(null)
    setSelectedDifficulty(null)
  }}
  className="text-sm underline text-blue-600"
>
  Reset filters
</button>


      {/*  Recipes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    
      {/*  Pagination – disabled during search */}
      {!debouncedTerm && (
        <div className="flex justify-center mt-8">
          {isLoading ? (
            <button disabled className="px-6 py-2 bg-gray-300 text-gray-700 rounded">
              Loading…
            </button>
          ) : hasMore ? (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Load More
            </button>
          ) : (
            <p className="text-gray-500 py-2">No more recipes to load.</p>
          )}
        </div>
      )}
    </>
  )
}

