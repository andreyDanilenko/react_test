import { useCallback } from 'react';
import { BaseButton } from '@/shared/ui';
import { RefreshIcon, PlusCircleIcon } from '@/shared/ui/icon';
import { AddProductModal } from '@/features/products';
import { useModal } from '@/shared/lib/modal';

interface Props {
  onRefresh: () => void;
  isFetching: boolean;
}

export function ProductsTableHeaderActions({
  onRefresh,
  isFetching,
}: Props) {
  const { openModal } = useModal();

  const handleOpen = useCallback(() => {
    openModal({
      component: AddProductModal,
      options: { size: 'md', closeOnOverlayClick: false },
    });
  }, [openModal]);

  return (
    <>
      <BaseButton
        variant="icon-outline"
        size="md"
        icon={<RefreshIcon size={22} />}
        onClick={onRefresh}
        disabled={isFetching}
        aria-label="Обновить"
      />
      <BaseButton
        variant="primary"
        size="md"
        icon={<PlusCircleIcon size={18} />}
        onClick={handleOpen}
        aria-label="Добавить товар"
      >
        Добавить
      </BaseButton>
    </>
  );
}
