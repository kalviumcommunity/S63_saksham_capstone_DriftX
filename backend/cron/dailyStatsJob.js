import cron from 'node-cron';
import mongoose from 'mongoose';
import User from '../models/UserSchema.js';
import Product from '../models/Productschema.js';

export const startDailyStatsJob = () => {
  cron.schedule(
    '0 0 * * *',
    async () => {
      console.log('🔁 Running daily stats job at midnight...');
      try {
        const [productCount, userCount] = await Promise.all([
          Product.countDocuments(),
          User.countDocuments(),
        ]);
        console.log(`📊 Products: ${productCount}, Users: ${userCount}`);
      } catch (err) {
        console.error('❌ Error running daily stats job:', err);
      }
    },
    {
      timezone: 'Asia/Kolkata',
    }
  );
  console.log('⏰ Daily stats cron job scheduled (Asia/Kolkata, midnight)');
}; 