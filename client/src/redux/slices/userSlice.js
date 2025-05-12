import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as apiLoginUser, updateUser as apiUpdateUser, deleteUser as apiDeleteUser } from '../../services/api';

// Login user thunk
export const loginUser = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await apiLoginUser({ email, password });
    // response should be { user, token }
    if (response && response.token && response.user) {
      localStorage.setItem('userInfo', JSON.stringify({ ...response.user, token: response.token }));
      return { ...response.user, token: response.token };
    } else {
      // fallback for old structure
      localStorage.setItem('userInfo', JSON.stringify(response));
      return response;
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

// Update user thunk
export const updateUser = createAsyncThunk('user/update', async (userData, thunkAPI) => {
  try {
    const updatedUser = await apiUpdateUser(userData);
    // keep the token from the old userInfo
    const oldUserInfo = localStorage.getItem('userInfo');
    let token = '';
    if (oldUserInfo) {
      try {
        token = JSON.parse(oldUserInfo).token;
      } catch {}
    }
    localStorage.setItem('userInfo', JSON.stringify({ ...updatedUser, token }));
    return { ...updatedUser, token };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Update failed');
  }
});

// Delete user thunk
export const deleteUser = createAsyncThunk('user/delete', async (_, thunkAPI) => {
  try {
    await apiDeleteUser();
    localStorage.removeItem('userInfo');
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Delete failed');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: (() => {
      const userInfoStr = localStorage.getItem('userInfo');
      if (!userInfoStr) return null;
      try {
        return JSON.parse(userInfoStr);
      } catch {
        localStorage.removeItem('userInfo');
        return null;
      }
    })(),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
