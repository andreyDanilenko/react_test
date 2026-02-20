import React, { useState, type SyntheticEvent } from 'react';
import { BaseButton, InputGroup } from '@/shared/ui';
import { CloseIcon } from '@/shared/ui/icon';
import { useAppToast } from '@/shared/lib/hooks';
import { useCreateProductMutation } from '@/features/products/api/productsApi';

import './AddProductModal.css';

interface AddProductModalProps {
  onClose: () => void;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [vendor, setVendor] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useAppToast();
  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct({
        title: name,
        price: Number(price) || 0,
        brand: vendor,
        article: article || undefined,
      }).unwrap();
      toast.success('Товар успешно добавлен', { title: 'Успешно' });
      onClose();
    } catch {
      toast.error('Не удалось добавить товар', { title: 'Ошибка' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AddProductModal">
      <div className="AddProductModal__Header">
        <h2 className="AddProductModal__Title">Добавить товар</h2>
        <BaseButton
          type="button"
          variant="icon-transparent"
          size="sm"
          icon={<CloseIcon width={18} height={18} />}
          onClick={onClose}
          disabled={loading}
          aria-label="Закрыть"
        />
      </div>

      <form onSubmit={handleSubmit} className="AddProductModal__Form">
        <InputGroup
          label="Наименование"
          placeholder="Введите наименование"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
        />
        <InputGroup
          label="Цена"
          type="number"
          min={0}
          step="0.01"
          placeholder="0.00"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          disabled={loading}
        />
        <InputGroup
          label="Вендор"
          placeholder="Введите вендора"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          disabled={loading}
        />
        <InputGroup
          label="Артикул"
          placeholder="Введите артикул"
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          disabled={loading}
        />

        <div className="AddProductModal__Actions">
          <BaseButton
            type="button"
            variant="ghost"
            size='md'
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </BaseButton>
          <BaseButton
            type="submit"
            size='md'
            variant="secondary"
            disabled={loading}
          >
            {loading ? 'Добавление...' : 'Добавить'}
          </BaseButton>
        </div>
      </form>
    </div>
  );
};
