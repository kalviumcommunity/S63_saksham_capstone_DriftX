import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';

// Import your reducers here
// import yourReducer from './reducers/yourReducer';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    // yourFeature: yourReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});
