import { formatPriceParts } from '@/shared/lib';

interface Props {
  price: number;
}

export function ProductPriceCell({ price }: Props) {
  const { int, dec } = formatPriceParts(price);

  return (
    <>
      {int}
      <span className="DataTable__PriceDec">{dec}</span>
    </>
  );
}
