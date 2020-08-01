import React, { FC, Fragment } from 'react';
import { useGetRequest } from '../../common/hooks/useGetRequest';
import { RouteComponentProps } from 'react-router-dom';
import InventoryCountDetails from './components/OpenInventoryCount';
import { CompletedInventoryCountDetail } from './components/CompletedInventoryCount';
import { BatchData } from './components/OpenInventoryCount/types';

interface Props extends RouteComponentProps<{ id: string }> {}

export const InventoryCountDetail: FC<Props> = ({
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
    <Fragment>
      {batch.status === 'Open' ? (
        <InventoryCountDetails batchId={id} />
      ) : (
        <CompletedInventoryCountDetail batchId={id} />
      )}
    </Fragment>
  );
};
