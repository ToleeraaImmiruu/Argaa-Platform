const yup = require('yup');

exports.createTourSchema = yup.object({
  title: yup.string().required('Title is required').trim(),
  description: yup.string().required('Description is required').trim(),
  coverImage: yup.string().url('Cover image must be a valid URL').required(),
  images: yup.array().of(yup.string().url()),
  price: yup.number().required('Price is required').min(0, 'Price cannot be negative'),
  durationHours: yup.number().required('Duration is required').integer().min(1),
  maxGroupSize: yup.number().required('Max group size is required').integer().min(1),
  category: yup
    .string()
    .required('Category is required')
    .oneOf(['historical', 'nature', 'adventure', 'cultural', 'religious', 'city-tour']),
  city: yup.string().required('City is required').trim(),
  meetingPoint: yup.string().required('Meeting point is required'),
  availableDates: yup.array().of(yup.date()).default([]),
  
  // Location is optional for now, but if provided, must have coordinates.
  location: yup.object({
    coordinates: yup.array().of(yup.number()).min(2).max(2),
    address: yup.string(),
  }).optional(),
});

exports.updateTourSchema = exports.createTourSchema.concat(
  yup.object({
    id: yup.string().required('Tour ID is required'),
  })
);

exports.updateTourSchema = yup.object({
  title: yup.string().trim().optional(),
  description: yup.string().trim().optional(),
  coverImage: yup.string().url('Cover image must be a valid URL').optional(),
  images: yup.array().of(yup.string().url()).optional(),
  price: yup.number().min(0).optional(),
  durationHours: yup.number().integer().min(1).optional(),
  maxGroupSize: yup.number().integer().min(1).optional(),
  category: yup
    .string()
    .oneOf(['historical', 'nature', 'adventure', 'cultural', 'religious', 'city-tour'])
    .optional(),
  city: yup.string().trim().optional(),
  meetingPoint: yup.string().optional(),
  availableDates: yup.array().of(yup.date()).optional(),
  location: yup.object({
    coordinates: yup.array().of(yup.number()).min(2).max(2),
    address: yup.string(),
  }).optional(),
  // Admin-only fields
  status: yup.string().oneOf(['pending', 'approved', 'rejected']).optional(),
  isPublished: yup.boolean().optional(),
});