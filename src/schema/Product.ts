import * as yup from 'yup';

// Define a validation schema with Yup
export const ProductCreateForm = yup.object().shape({
  name: yup.string().required('Product name is required'),
  imageUrl: yup.string().required('Product Image is required').default(null),
  code: yup.string().optional().default(null),
  barCode: yup.string().optional().default(null),
  type: yup.string().optional().default(null),
  price: yup.number().moreThan(0).required('Price is required').default(null),
  isActive: yup.boolean().optional().default(true),
});