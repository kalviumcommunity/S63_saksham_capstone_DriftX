import express from 'express';
import { getAutocomplete } from '../controllers/autocompleteController.js';

const router = express.Router();

router.post('/', getAutocomplete);

export default router; 