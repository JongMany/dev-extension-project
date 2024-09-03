"use client";
import { useState } from "react";
export const useModal = () => {
  const [isOpen, toggleModal] = useState(false);

  const closeModal = () => {
    toggleModal(false);
  };

  const openModal = () => {
    toggleModal(true);
  };

  return { isOpen, closeModal, openModal };
};
