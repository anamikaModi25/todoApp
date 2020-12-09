import { useToast } from '@chakra-ui/react';
import { MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit';

const toast = useToast();

export const rtkQueryErrorLogger = (api: MiddlewareAPI) => (next: any) => (action: any) => {
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');
    toast({ title: 'Async error!', description: action.error.data.message });
  }

  return next(action);
};