import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

type ProtectedProps = {
  onlyNoAuth: boolean;
  component: React.JSX.Element;
};

export const Protected = ({
  component,
  onlyNoAuth
}: ProtectedProps): React.JSX.Element => {
  if (component && onlyNoAuth) {
    return <Navigate to='/feed' />;
  }
  return component;
};
