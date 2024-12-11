import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  title: { type: String, required: true },
  customerName: { type: String, required: true, maxlength: 50 },
  email: { type: String, required: true, unique: true },
  countryCode: { type: String, required: true },
  mobileNumber: { type: String, required: true, match: /^\d{10}$/ },
  userId: { type: String, required: true, unique: true, minlength: 5, maxlength: 20 },
  password: { type: String, required: true, minlength: 6, maxlength: 30 },
  customerId: { type: String, required: true, unique: true },
});

export default mongoose.model('user', UserSchema);
