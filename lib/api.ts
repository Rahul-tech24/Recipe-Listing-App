// lib/api.ts
export async function fetchRecipes(limit = 9, skip = 0) {
    const res = await fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`, {
      // so Next.js doesn’t cache this in build-time SSG
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch recipes')
    const data = await res.json()
    return {
      recipes: data.recipes,
      total: data.total,       // total count from API
    }
  }
  