"use client";

import Image from 'next/image';
import React, { useState } from 'react';

const Books = () => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  const [showMorePrices, setShowMorePrices] = useState(false);

  return (
    <div>Books</div>
  )
}

export default Books;