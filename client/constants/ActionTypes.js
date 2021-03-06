// Sync
export const START_SYNC = 'START_SYNC'
export const END_SYNC = 'END_SYNC'
export const SYNC_PROGRESS = 'SYNC_PROGRESS'

// Orders
export const CHANGE_OPERATION_MODE = 'CHANGE_OPERATION_MODE'
export const START_DELETING_ORDER = 'START_DELETING_ORDER'
export const CANCEL_DELETING_ORDER = 'CANCEL_DELETING_ORDER'
export const DELETE_ORDER = 'DELETE_ORDER'
export const CHANGE_ORDER_QUANTITY = 'CHANGE_ORDER_QUANTITY'
export const START_CHANGING_ORDER_QUANTITY = 'START_CHANGING_ORDER_QUANTITY'
export const FINISH_CHANGING_ORDER_QUANTITY = 'FINISH_CHANGING_ORDER_QUANTITY'
export const CANCEL_CHANGING_ORDER_QUANTITY = 'CANCEL_CHANGING_ORDER_QUANTITY'
export const CREATE_PENDING_TRANSACTION = 'CREATE_PENDING_TRANSACTION'
export const DISCARD_PENDING_TRANSACTION = 'DISCARD_PENDING_TRANSACTION'
export const CHANGE_PENDING_TRANSACTION_QUANTITY = 'CHANGE_PENDING_TRANSACTION_QUANTITY'
export const PROMPT_START_MODIFY_TRANSACTION = 'PROMPT_START_MODIFY_TRANSACTION'
export const CANCEL_START_MODIFY_TRANSACTION = 'CANCEL_START_MODIFY_TRANSACTION'
export const CONFIRM_START_MODIFY_TRANSACTION = 'CONFIRM_START_MODIFY_TRANSACTION'

// Collection
export const ADD_ORDER = 'ADD_ORDER'

// Authenticate
export const START_SESSION = 'START_SESSION'
export const END_SESSION = 'END_SESSION'

// Scanner
export const INITIALIZE_SCANNER = 'INITIALIZE_SCANNER'
export const START_SCANNING = 'START_SCANNING'
export const END_SCANNING = 'END_SCANNING'
export const FOUND_BARCODE = 'FOUND_BARCODE'

// Barcode
export const LOOKUP_BARCODE = 'LOOKUP_BARCODE'
export const FAIL_LOOKUP_BARCODE = 'FAIL_LOOKUP_BARCODE'
export const SUCCEED_LOOKUP_BARCODE = 'SUCCEED_LOOKUP_BARCODE'

// Product
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS'
export const FAIL_SEARCH_PRODUCTS = 'FAIL_SEARCH_PRODUCTS'
export const SUCCEED_SEARCH_PRODUCTS = 'SUCCEED_SEARCH_PRODUCTS'

// Cashier
export const LOGIN_CASHIER = 'LOGIN_CASHIER'
export const LOGOUT_CASHIER = 'LOGOUT_CASHIER'
export const SUCCEED_LOGIN_CASHIER = 'SUCCEED_LOGIN_CASHIER'
export const FAIL_LOGIN_CASHIER = 'FAIL_LOGIN_CASHIER'

// Network
export const NET_FAIL_OFFLINE = 'NET_FAIL_OFFLINE'
export const NET_FAIL_NO_SESSION = 'NET_FAIL_NO_SESSION'

// - Orders
export const REQUEST_PROCESS_ORDERS = 'REQUEST_PROCESS_ORDERS'
export const RECEIVE_PROCESS_ORDERS = 'RECEIVE_PROCESS_ORDERS'
export const SUCCEED_PROCESS_ORDERS = 'SUCCEED_PROCESS_ORDERS'
export const FAIL_PROCESS_ORDERS = 'FAIL_PROCESS_ORDERS'
// - Products
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const INVALIDATE_PRODUCTS = 'INVALIDATE_PRODUCTS'
export const RESET_PRODUCTS = 'RESET_PRODUCTS'
// - Cashiers
export const REQUEST_CASHIERS = 'REQUEST_CASHIERS'
export const RECEIVE_CASHIERS = 'RECEIVE_CASHIERS'
export const INVALIDATE_CASHIERS = 'INVALIDATE_CASHIERS'
export const RESET_CASHIERS = 'RESET_CASHIERS'
// - Barcodes
export const REQUEST_BARCODES = 'REQUEST_BARCODES'
export const RECEIVE_BARCODES = 'RECEIVE_BARCODES'
export const INVALIDATE_BARCODES = 'INVALIDATE_BARCODES'
export const RESET_BARCODES = 'RESET_BARCODES'
// - Session
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const FAIL_LOGIN = 'FAIL_LOGIN'
export const SUCCEED_LOGIN = 'SUCCEED_LOGIN'
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'
export const RECEIVE_LOGOUT = 'RECEIVE_LOGOUT'

// UI
export const UI_SHOW_MENU = 'UI_SHOW_MENU'
export const UI_HIDE_MENU = 'UI_HIDE_MENU'

// App
export const APP_INITIALIZE = 'APP_INITIALIZE'
export const APP_RESET = 'APP_RESET'
export const APP_SET_API_ROOT = 'APP_SET_API_ROOT'
export const APP_SET_STORE_ID = 'APP_SET_STORE_ID'
export const API_ROOT_INVALID = 'API_ROOT_INVALID'
export const API_ROOT_VALID = 'API_ROOT_VALID'

// Error Handling
export const ERROR_DISPLAY = 'ERROR_DISPLAY'
export const ERROR_DISMISS = 'ERROR_DISMISS'

// Validation
export const VALIDATE = 'VALIDATE'
export const INVALIDATE = 'INVALIDATE'
