import { createContext } from "react";
import { isUserLoggedIn } from "./auth";
import { getSavedRecipes,getLikes,getDislikes} from "./dataService";
//setting initial state of store 
export const initialStoreState = {
    user:{
      isUserLoggedIn: isUserLoggedIn()
    },
    recipes:{
      data:[],
      savedItems:getSavedRecipes(),
      likedItems:getLikes(),
      dislikedItems:getDislikes()

    }
  }

export const StoreContext  = createContext()