/*

Test specs for products store

1) Expect getProducts action to deep equal {type: GET_PRODUCTS, products}.
2) Expect initial state to be an empty object.
3) Expect the new state to have length of data and not equal to previous state.
4) Expect fetchProducts Thunk creator to get /products and change store state.
5) Expect if fetchProducts Thunk creator sends error message when failed

*/
