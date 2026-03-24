'use client';
import { MenuItemType } from '../lib/types';

interface Props {
  item: MenuItemType;
}

export default function MenuItemRow({ item }: Props) {
  return (
    <div className="item-row">
      <div className="item-flex">
        <span className="item-name">{item.name.toUpperCase()}</span>
        <div className="item-dots" />
        <span className="item-price">${item.price}</span>
      </div>
      {item.description && <p className="item-desc">{item.description}</p>}
    </div>
  );
}
