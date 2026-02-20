import { BaseButton } from '@/shared/ui';
import { PlusIcon, DotsCircleIcon } from '@/shared/ui/icon';
import type { Product } from '@/entities/product';

interface Props {
  product: Product;
}

export function ProductsTableRowActions({ product }: Props) {
  return (
    <>
      <BaseButton
        variant="icon-only"
        size="md"
        className="DataTable__RowActionQuickAdd"
        icon={<PlusIcon size={20} />}
        aria-label={`Быстрое добавление ${product.title}`}
      />
      <BaseButton
        variant="icon-transparent"
        className="DataTable__RowActionMore"
        icon={<DotsCircleIcon size={26} />}
        aria-label={`Ещё действия для ${product.title}`}
      />
    </>
  );
}
