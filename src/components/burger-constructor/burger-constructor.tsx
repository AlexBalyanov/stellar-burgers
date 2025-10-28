import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrder,
  orderBurger
} from '../../services/slices/orderBurgerSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorIngredients = useSelector(
    (state) => state.burgerConstructor.ingredients
  );
  const bun = useSelector((state) => state.burgerConstructor.bun);
  const ingredientsIds = constructorIngredients.map((item) => item._id);
  const constructorItems = {
    bun: bun,
    ingredients: constructorIngredients
  };

  const orderRequest = useSelector((state) => state.orderBurger.isLoading);

  const orderModalData = useSelector((state) => state.orderBurger.orderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(orderBurger(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
