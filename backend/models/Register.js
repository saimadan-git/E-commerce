import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
      name: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      pincode: { type: String, required: true },
      area: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      landmark: { type: String },
      alternateMobile: { type: String },
      type: { type: String, required: true },
      customType: { type: String, default: null },
      default: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    });
const UserSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  // // customerName: { type: String, required: true, maxlength: 50 },
  // email: { type: String, required: true, unique: true },
  // // countryCode: { type: String, required: true },
  // mobileNumber: { type: String, required: true, match: /^\d{10}$/ },
  // // userId: { type: String, required: true, unique: true, minlength: 5, maxlength: 20 },
  // password: { type: String, required: true, minlength: 6, maxlength: 30 },
  // customerId: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },
  name: { type: String },
  password: { type: String }, // For traditional login
  mobileNumber: { type: String },
  googleId: { type: String }, // For Google login
  provider: { type: String, default: 'local' }, // 'local' or 'google'
  addressess: [addressSchema],
  role: { type: String, default: 'user' }, // 'user' or 'admin'
});

export default mongoose.model('user', UserSchema);