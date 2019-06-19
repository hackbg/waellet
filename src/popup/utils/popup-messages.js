//error messages
export const INSUFFICIENT_BALANCE = {type:'error',title:'Insufficient balance',msg:'The requested amount cannot be spent.'};
export const SEED_FAST_COPY = {type:'error',title:'That was too fast!', msg:'Please make sure you write down the recovery phrase on paper and keep it in a safe place.'}
export const INCORRECT_ADDRESS = {type:'error',title:'Incorrect address', msg:'Please make sure you enterd valid public address! '}
export const INCORRECT_AMOUNT = {type:'error',title:'Enter amount', msg:'Please make sure you enterd valid amount to send! '}
export const TRANSACTION_FAILED = {type:'error',title:'Oops! Something went wrong', msg:'We cannot process this transaction! Plesse, try again!'}
//success messages
export const PUBLIC_KEY_COPIED = {type:'success',title:'Copied',msg:'Public key copied to clipboard! '};
export const SUCCESS_TRANSFER = {type:'success',title:'Transfer completed', msg:''}