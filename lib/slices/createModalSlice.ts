import { StateCreator } from "zustand";
import { ModalID } from "types/modal";

export interface ModalSlice {
    modalId: ModalID;
    showModal: boolean;
    openModal: (modalId: ModalID) => void;
    closeModal: () => void;
}

export const createModalSlice: StateCreator<ModalSlice> = (set, get) => ({
    modalId: ModalID.UNKNOWN,
    showModal: false,
    openModal: (modalId: ModalID) => {
        set({
            modalId,
            showModal: true,
        });
    },
    closeModal: () => {
        set({
            modalId: ModalID.UNKNOWN,
            showModal: false,
        });
    },
});
