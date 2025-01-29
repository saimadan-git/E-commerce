import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // // customerName: { type: String, required: true, maxlength: 50 },
  // email: { type: String, required: true, unique: true },
  // // countryCode: { type: String, required: true },
  // mobileNumber: { type: String, required: true, match: /^\d{10}$/ },
  // // userId: { type: String, required: true, unique: true, minlength: 5, maxlength: 20 },
  // password: { type: String, required: true, minlength: 6, maxlength: 30 },
  // customerId: { type: String, required: true, unique: true },
<<<<<<< HEAD

  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String }, // For traditional login
  mobile: { type: String },
  googleId: { type: String }, // For Google login
  provider: { type: String, default: 'local' }, // 'local' or 'google'
=======
  address: { type: String , default: ''},
>>>>>>> 75265ceeeb3cda390cf83b19416aae05b416b9d9
});

export default mongoose.model('user', UserSchema);
