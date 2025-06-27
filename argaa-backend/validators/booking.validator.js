// validators/booking.validator.js
const yup = require('yup');

exports.createTourBookingSchema = yup.object({
  tourDate: yup
    .date()
    .required('A booking date is required.'),
  numberOfPeople: yup
    .number()
    .required('Number of people is required.')
    .integer('Number of people must be a whole number.')
    .min(1, 'You must book for at least one person.'),
});