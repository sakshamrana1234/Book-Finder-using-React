import { configureStore ,createSlice} from "@reduxjs/toolkit";
const BookSlice=createSlice({
name:"books",
initialState:{
   books:[],chosenOne:null
},
reducers:{
  addInitialBooks:(state,action)=>{
   state.books=action.payload;
},
   selectedBook:(state,action)=>{
      state.chosenOne=action.payload;
   },
},
});
export const BooksActions=BookSlice.actions;

const BookStore=configureStore({
reducer:{
   books:BookSlice.reducer,
},
});
export default BookStore;
