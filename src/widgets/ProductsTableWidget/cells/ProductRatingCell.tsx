import { RATING_LOW_THRESHOLD } from '../config/constants';

interface Props {
  rating: number;
}

export function ProductRatingCell({ rating }: Props) {
  const isLow = rating < RATING_LOW_THRESHOLD;

  return (
    <>
      <span className={isLow ? 'DataTable__RatingValue--low' : ''}>
        {rating.toFixed(1)}
      </span>
      /5
    </>
  );
}
