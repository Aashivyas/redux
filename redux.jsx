// index.js
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
// store.js
import { configureStore } from "@reduxjs/toolkit";
import cartRuducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        cart: cartRuducer,
        product: productReducer,
    },
});
export default store;
// slice.js
const { createSlice } = require('@reduxjs/toolkit');
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload)
        },
    },
});
export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
// use.js
import { useSelector } from 'react-redux';
let items = useSelector((state) => state.cart);
// action.js
import { useDispatch, useSelector } from 'react-redux';
const dispatch = useDispatch();
const handleAdd = (item) => {
    dispatch(add(item));
}
// bootstratp
import '../node_modules/bootstrap/dist/css/bootstrap.css'
// thunk.js
import axios from 'axios';
const { createSlice } = require('@reduxjs/toolkit');
const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
    },
    reducers: {
        setProducts(state, action) {
            console.log(action.payload);
            state.data = action.payload;
        }
    },
});
export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
    return async function fetchProductsThunk(dispatch, getState) {
        try {
            await axios.get('https://fakestoreapi.com/products')
                .then((res) => {
                    console.log(res.data);
                    dispatch(setProducts(res.data));

                }).catch((err) => {
                    console.log(err);
                });
        } catch (err) {

        }
    }
}