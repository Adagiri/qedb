import ProductIcon from '@material-ui/icons/Collections';
import ProductList from './ProductList';
// import ProductEdit from './ProductEdit';
import ProductCreate from './ProductCreate';
import { EditGuesser } from 'react-admin';

export default {
  list: ProductList,
  create: ProductCreate,
  edit: EditGuesser,
  icon: ProductIcon,
};
