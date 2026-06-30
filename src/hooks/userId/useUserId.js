import { useState, useCallback } from 'react';

export const generateCustomId = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default function useUserId(length = 6) {
  const [id, setId] = useState('');

  const regenerateId = useCallback(() => {
    const newId = generateCustomId(length);
    setId(newId);
    return newId;
  }, [length]);

  return { id, regenerateId };
}
