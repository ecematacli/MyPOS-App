// import { useState } from 'react';

// import api from '../../../api';
// import { BatchData, BatchesProductsData } from '../types';

// export const useBatchProductApiCalls = (page: number, rowsPerPage: number) => {
//   const [loading, setLoading] = useState(false);
//   const [countBatch, setCountBatch] = useState<BatchData>(null);
//   const [batchProducts, setBatchProducts] = useState<BatchesProductsData>({
//     counted: 0,
//     uncounted: 0,
//     products: [],
//   });
//   const fetchBatchesProducts = async (id: number) => {
//     try {
//       setLoading(true);
//       const response = await api.get(
//         `/inventory-count/${id}/products?page=${page}&rowsPerPage=${rowsPerPage}`
//       );
//       const data: BatchesProductsData = response.data;
//       setBatchProducts(data);
//       setLoading(false);
//     } catch (e) {}
//   };

//   const fetchCountBatch = async (id: number) => {
//     try {
//       setLoading(true);
//       const response = await api.get(`/inventory-count/${id}`);
//       const data: BatchData = response.data;
//       setCountBatch(data);
//       setLoading(false);
//     } catch (e) {}
//   };
// };
