'use client';

import { useEffect } from 'react';

export default function VideoRedirect() {
  useEffect(() => {
    window.location.replace('/de/video');
  }, []);

  return null;
}
