import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
    address: string | null
    balance: number
    tokens: any
}

const initialState: WalletState = {
    address: null,
    balance: 0,
    tokens: []
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setTokens(state, action: PayloadAction<any>) {
            state.tokens = action.payload;
        },
        setBalance(state, action: PayloadAction<number>) {
            state.balance = action.payload;
        }
    },
});

export const { setAddress, setTokens, setBalance } = walletSlice.actions;
export default walletSlice.reducer;