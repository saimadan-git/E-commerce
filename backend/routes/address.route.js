import express from 'express';
import { addAddress, getAddressess, getAddressById, updateAddress, deleteAddress } from '../controller/address.controller.js';
const router = express.Router();
//Add address
router.post('/addAddress', addAddress);
//Get address
router.get('/getAddressess/:userId', getAddressess);
//Get address by ID
router.get('/getAddressById/:userId/:addressId', getAddressById);
//Update address
router.put('/updateAddress/:userId/:addressId', updateAddress);
//Delete address by ID
router.delete('/deleteAddress/:userId/:addressId', deleteAddress);
export default router;