interface Props {
  visible: boolean;
}

export function ProductsTableOverlay({ visible }: Props) {
  return (
    <div
      className={`ProductsTableWidget__Overlay ${
        visible ? 'ProductsTableWidget__Overlay--visible' : ''
      }`}
      role="status"
      aria-live="polite"
      aria-label="Загрузка данных"
      aria-hidden={!visible}
    >
      <div className="ProductsTableWidget__Loader" />
    </div>
  );
}
