import express from 'express';

import { productRoute } from './product.routes';
import { stockRoute } from './stock.routes';
import { storeRoute } from './store.routes';

const apiRoutes = express.Router();

apiRoutes.use('/product', productRoute);
apiRoutes.use('/stock', stockRoute);
apiRoutes.use('/store', storeRoute);

export { apiRoutes };
