import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

type ProtectedProps = {
  onlyNoAuth: boolean;
  component: React.JSX.Element;
};

export const Protected = ({
  component,
  onlyNoAuth
}: ProtectedProps): React.JSX.Element => {
  const user = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  if (isAuthChecked && !user) {
    return <Navigate to='/login' />;
  }

  return component;
};
