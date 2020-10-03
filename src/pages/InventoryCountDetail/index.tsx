import React from 'react';
import { useGetRequest } from '../../common/hooks/useGetRequest';
import { RouteComponentProps } from 'react-router-dom';
import InventoryCountDetails from './components/OpenInventoryCount';
import { CompletedInventoryCountDetail } from './components/CompletedInventoryCount';
import { BatchData } from './components/OpenInventoryCount/types';

interface Props extends RouteComponentProps<{ id: string }> { }

export const InventoryCountDetail: React.FC<Props> = ({
  match: {
    params: { id },
  },
}) => {
  const { value: batch, loading } = useGetRequest<BatchData>(
    `/inventory-count/${id}`
  );

  if (!batch || loading) {
    return null;
  }

  return (
    <div style={{ paddingTop: 24 }}>
      {batch.status === 'Open' ? (
        <InventoryCountDetails batchId={id} />
      ) : (
          <CompletedInventoryCountDetail batchId={id} />
        )}
    </div>
  );
};
