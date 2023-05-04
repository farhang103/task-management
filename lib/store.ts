import { create } from "zustand";
import {
    createSidebarSlice,
    SidebarSlice,
} from "lib/slices/createSidebarSlice";
import { BoardSlice, createBoardSlice } from "lib/slices/createBoardSlice";
import { createModalSlice, ModalSlice } from "lib/slices/createModalSlice";
import { persist } from "zustand/middleware";

type StoreState = ModalSlice & BoardSlice & SidebarSlice;

export const useAppStore = create<StoreState>()(
    persist(
        (...a) => ({
            ...createModalSlice(...a),
            ...createBoardSlice(...a),
            ...createSidebarSlice(...a),
        }),
        {
            name: "kanban-task-management-store",
            version: 2,
            partialize: (state) => ({
                boards: state.boards,
                showSidebar: state.showSidebar,
            }),
        }
    )
);
