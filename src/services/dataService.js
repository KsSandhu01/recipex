
const savedItemsKey = 'savedItems'
const likedItemsKey = 'likedItems'
const dislikedItemsKey = 'dislikedItems'

export const saveRecipe = (recipe) => {
    const savedItems = getSavedRecipes()
    localStorage.setItem(savedItemsKey, JSON.stringify([...savedItems, recipe]))
}

export const getSavedRecipes = () => {
    return JSON.parse(localStorage.getItem(savedItemsKey) ?? '[]')
}

export const getSavedRecipe = (id) => {
    return getSavedRecipes().find((r) => r.id === id)
}

export const removeSavedRecipe = (id) => {
    localStorage.setItem(savedItemsKey, JSON.stringify(getSavedRecipes().filter((rec) => rec.id !== id)))
}

// likes

export const saveLike = (id, value = true) => {
    console.log(id, value)
    const likes = getLikes()
    if (value) {
        localStorage.setItem(likedItemsKey, JSON.stringify([...likes, id]))
    } else {
        localStorage.setItem(likedItemsKey, JSON.stringify(likes.filter((rid) => rid !== id)))
    }
}

export const getLikes = () => {
    return JSON.parse(localStorage.getItem(likedItemsKey) ?? '[]')
}

// dislikes

export const saveDislike = (id, value = true) => {
    console.log(id, value)
    const dislikes = getDislikes()
    if (value) {
        localStorage.setItem(dislikedItemsKey, JSON.stringify([...dislikes, id]))
    } else {
        localStorage.setItem(dislikedItemsKey, JSON.stringify(dislikes.filter((rid) => rid !== id)))
    }
}

export const getDislikes = () => {
    return JSON.parse(localStorage.getItem(dislikedItemsKey) ?? '[]')
}
