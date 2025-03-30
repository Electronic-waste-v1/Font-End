import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from "../features/auth/slices/authSlice"
import { authApi } from "../features/auth/services/authApi"
import { ewasteApi } from "@/shared/services/ewasteApi"
import { annonceApi } from "@/shared/services/annonceApi"
import { recyclingCenterApi } from "@/recycling-center"
import { collectionApi } from "@/shared/services/collectionApi"
import { recompenseApi } from "@/shared/services/recompenseApi"
import { recyclingApi } from "@/shared/services/recyclingApi"
import { communityApi } from "@/shared/services/communityApi"



export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [ewasteApi.reducerPath]: ewasteApi.reducer,
    [annonceApi.reducerPath]: annonceApi.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [recyclingCenterApi.reducerPath]: recyclingCenterApi.reducer,
    [recompenseApi.reducerPath]: recompenseApi.reducer,
    [recyclingApi.reducerPath]: recyclingApi.reducer,
    [communityApi.reducerPath]: communityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
   
      .concat(ewasteApi.middleware)
      .concat(annonceApi.middleware)
     .concat(collectionApi.middleware)
      .concat(recyclingCenterApi.middleware)
      .concat(recompenseApi.middleware)
      .concat(recyclingApi.middleware)
      .concat(communityApi.middleware),
  
      

})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

